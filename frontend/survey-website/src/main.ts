import './style.css';
import { TextPage } from './pages/text-page.ts';
import { TextInputPage, type TextInputPageProps, type TextInputPageResult } from './pages/text-input-page.ts';
import {
	QuestionnairePage,
	type QuestionnairePageProps,
	type QuestionnairePageResult,
} from './pages/questionnaire/questionnaire-page.ts';
import { InstancePage, type InstancePageResult } from './pages/instance-page.ts';
import { Paginator, type PageRegistry } from './pagination/paginator.ts';
import type { LocalizationBundle, PageFactoryContext } from './pagination/types.ts';
import type { TextPageProps } from './pages/text-page.ts';
import { loadSurveyConfig } from './config/loader.ts';
import { resolveCopyCatalog } from './config/copy.ts';
import type { InstancePagePropsConfig, LoadedSurveyConfig, TextDirection } from './config/types.ts';
import { resolveSubmitEndpoint } from './config/api-endpoints.ts';

type ThemeMode = 'auto' | 'light' | 'dark';
type CompletionDisplayMode = 'auto' | 'on' | 'off';

const DEFAULT_THEME: ThemeMode = 'light'; // Set to 'auto' to follow system preference
const COMPLETION_QUERY_PARAM = 'showCompletionPayload';
const MAX_SUBMISSION_RETRIES = 2;
const SUBMISSION_RETRY_DELAY_MS = 1500;
let cachedCompletionDisplay: boolean | undefined;

let autoThemeMediaQuery: MediaQueryList | undefined;
let autoThemeListener: ((event: MediaQueryListEvent) => void) | undefined;

const registry: PageRegistry = {
	text: (context) => new TextPage(context as PageFactoryContext<TextPageProps, void>),
	textInput: (context) =>
		new TextInputPage(context as PageFactoryContext<TextInputPageProps, TextInputPageResult>),
	questionnaire: (context) =>
		new QuestionnairePage(
			context as PageFactoryContext<QuestionnairePageProps, QuestionnairePageResult>,
		),
	instance: (context) =>
		new InstancePage(context as PageFactoryContext<InstancePagePropsConfig, InstancePageResult>),
};

/**
 * Bootstraps the survey application by loading configuration, wiring the paginator,
 * and attaching submission handlers inside the #app container.
 */
async function bootstrap(): Promise<void> {
	applyPreferredTheme(DEFAULT_THEME);
	const app = document.querySelector<HTMLDivElement>('#app');
	if (!app) {
		throw new Error('Failed to locate #app container.');
	}

	let config: LoadedSurveyConfig;
	try {
		config = await loadSurveyConfig();
		console.log(config);
	} catch (error) {
		console.error('Unable to load survey configuration.', error);
		const fallbackCopy = resolveCopyCatalog();
		app.innerHTML = `<p>${fallbackCopy.app.loadFailure}</p>`;
		return;
	}

	updateDocumentMetadata(config);
	applyDocumentLanguage(config.settings.language);
	applyDocumentDirection(config.settings.direction);

	if (config.pages.length === 0) {
		app.innerHTML = `<p>${config.copy.app.noPages}</p>`;
		return;
	}

	const paginator = new Paginator(app, config.pages, registry, {
		showProgress: config.settings.showProgress,
		storageKey: config.settings.storageKey,
		storageVersion: config.settings.storageVersion,
		direction: config.settings.direction,
		copy: config.copy,
		onReset: () => {
			clearAutosaveEntries(config.settings.autosaveKeysToClear);
		},
		onComplete: (payload) => {
			paginator.dispose();
			const submissionId = generateSubmissionId();
			const submission = {
				submissionId,
				responses: payload.dataById,
				pageDurationsMs: payload.pageDurationsMs,
				locale: config.copy.locale,
				language: config.settings.language,
				meta: config.meta,
			};
			const submissionJson = JSON.stringify(submission, null, 2);
			const submitEndpoint = resolveSubmitEndpoint();
			// TODO: make this more configurable.
			const completionCopy = config.copy.completion;

			const shouldShowCompletionPayload = resolveCompletionDisplayFlag();
			const completionDirection = config.settings.direction ?? 'ltr';
			const completionBody = `
				<div class="survey-complete">
					<h2>${completionCopy.heading}</h2>
					<p>${completionCopy.body}</p>
					<h3>${completionCopy.serverHeading}</h3>
					<div class="server-response" dir="${completionDirection}">
						<p id="server-response" class="server-response__message"></p>
					</div>
					${shouldShowCompletionPayload ? `
					<h3>${completionCopy.responseHeading}</h3>
					<pre class="json-display" dir="ltr"><code id="survey-complete"></code></pre>
					` : ''}
				</div>
			`;
			app.innerHTML = completionBody;
			const surveyCompleteElem = shouldShowCompletionPayload
				? app.querySelector('code#survey-complete')
				: null;
			const serverResponseElem = app.querySelector('#server-response');
			if (surveyCompleteElem) {
				surveyCompleteElem.textContent = submissionJson;
			}

			console.log('Sending survey response to server...', submissionId);
			console.log(submissionJson);
			console.log('POST', submitEndpoint);
			const serverResponseContainer = serverResponseElem?.parentElement ?? null;
			if (serverResponseContainer && serverResponseElem) {
				serverResponseContainer.style.visibility = 'visible';
				serverResponseElem.textContent = completionCopy.submissionPending;
				const serverResponsePromise = submitWithRetries(
					submitEndpoint,
					submissionJson,
					completionCopy,
					(serverMessage) => {
						serverResponseElem.textContent = serverMessage;
					},
				);
				void serverResponsePromise
					.then(async (response) => {
						const text = await response.text();
						serverResponseElem.textContent = interpretServerResponseMessage(completionCopy, response, text);
						if (!response.ok) {
							console.error('Submission failed', response.status, response.statusText, text);
						}
					})
					.catch((error) => {
						console.error('Failed to submit survey response', error);
						const errorMessage = error instanceof Error ? error.message : String(error);
						const friendlyMessage = completionCopy.submissionFailedMessage
							?? `${completionCopy.submissionFailedPrefix} ${errorMessage}`;
						serverResponseElem.textContent = friendlyMessage;
					});
			} else {
				void submitWithRetries(submitEndpoint, submissionJson, completionCopy).catch((error) => {
					console.error('Failed to submit survey response', error);
				});
			}

			clearAutosaveEntries(config.settings.autosaveKeysToClear);
		},
	});

	paginator.start();
}

function normalizeCompletionMode(value: string | null | undefined): CompletionDisplayMode | undefined {
	if (!value) {
		return undefined;
	}
	const normalized = value.trim().toLowerCase();
	if (normalized === 'on' || normalized === 'off' || normalized === 'auto') {
		return normalized;
	}
	if (normalized === 'true' || normalized === '1') {
		return 'on';
	}
	if (normalized === 'false' || normalized === '0') {
		return 'off';
	}
	return undefined;
}

function resolveCompletionDisplayFlag(): boolean {
	if (typeof cachedCompletionDisplay === 'boolean') {
		return cachedCompletionDisplay;
	}

	let mode: CompletionDisplayMode | undefined;
	if (typeof window !== 'undefined') {
		try {
			const params = new URLSearchParams(window.location.search);
			mode = normalizeCompletionMode(params.get(COMPLETION_QUERY_PARAM));
		} catch (error) {
			console.warn('Failed to parse completion query parameter.', error);
		}
	}

	if (!mode) {
		const envValue = import.meta.env.VITE_SHOW_COMPLETION_PAYLOAD as string | undefined;
		mode = normalizeCompletionMode(envValue);
	}

	if (!mode || mode === 'auto') {
		cachedCompletionDisplay = false;
		return cachedCompletionDisplay;
	}

	cachedCompletionDisplay = mode === 'on';
	return cachedCompletionDisplay;
}

interface ServerResponsePayload {
	resultCode?: string;
	message?: string;
}

function interpretServerResponseMessage(
	completionCopy: LocalizationBundle['completion'],
	response: Response,
	bodyText: string,
): string {
	const trimmed = bodyText?.trim?.() ?? '';
	let payload: ServerResponsePayload | undefined;
	if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
		try {
			payload = JSON.parse(trimmed) as ServerResponsePayload;
		} catch (error) {
			console.warn('Failed to parse server response JSON.', error);
		}
	}

	const resultCode = typeof payload?.resultCode === 'string' ? payload.resultCode : undefined;
	if (resultCode) {
		const serverMessages = completionCopy.serverMessages ?? {};
		if (serverMessages[resultCode]) {
			return serverMessages[resultCode];
		}
		if (completionCopy.unknownServerMessage) {
			return completionCopy.unknownServerMessage(resultCode);
		}
	}

	if (payload?.message) {
		return payload.message;
	}

	if (!response.ok) {
		const description = trimmed || response.statusText || 'Unknown error';
		return `${completionCopy.submissionFailedPrefix} ${description}`;
	}

	if (trimmed) {
		return trimmed;
	}

	return completionCopy.defaultServerMessage ?? completionCopy.submissionPending;
}

function generateSubmissionId(): string {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}
	const randomPart = Math.random().toString(36).slice(2, 10);
	return `${Date.now().toString(36)}-${randomPart}`;
}

function delay(durationMs: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, durationMs);
	});
}

async function submitWithRetries(
	endpoint: string,
	body: string,
	completionCopy: LocalizationBundle['completion'],
	updateStatus?: (message: string) => void,
): Promise<Response> {
	const totalAttempts = MAX_SUBMISSION_RETRIES + 1;
	for (let attempt = 0; attempt < totalAttempts; attempt += 1) {
		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body,
			});
			if (response.ok) {
				return response;
			}

			const shouldRetry = response.status >= 500 && attempt < MAX_SUBMISSION_RETRIES;
			if (!shouldRetry) {
				return response;
			}
		} catch (error) {
			if (attempt === MAX_SUBMISSION_RETRIES) {
				throw error;
			}
		}

		if (updateStatus && completionCopy.submissionRetrying) {
			updateStatus(completionCopy.submissionRetrying(attempt + 2, totalAttempts));
		}
		await delay(SUBMISSION_RETRY_DELAY_MS);
	}

	throw new Error('Submission retries exhausted');
}

/**
 * Applies the requested text direction to the root document element.
 */
function applyDocumentDirection(direction: TextDirection): void {
	if (typeof document === 'undefined') {
		return;
	}
	document.documentElement.setAttribute('dir', direction);
}

/**
 * Sets or clears the document language attribute based on configuration.
 */
function applyDocumentLanguage(language?: string): void {
	if (typeof document === 'undefined') {
		return;
	}
	if (!language) {
		document.documentElement.removeAttribute('lang');
		return;
	}
	document.documentElement.setAttribute('lang', language);
}

/**
 * Updates document-level metadata (title) based on the loaded survey configuration.
 */
function updateDocumentMetadata(config: LoadedSurveyConfig): void {
	if (typeof document === 'undefined') {
		return;
	}
	const title = typeof config.meta?.title === 'string' ? config.meta.title : undefined;
	if (title) {
		document.title = title;
	}
}

/**
 * Removes persisted autosave entries for the provided keys, ignoring storage failures.
 */
function clearAutosaveEntries(keys: string[]): void {
	if (keys.length === 0 || typeof window === 'undefined' || !window.localStorage) {
		return;
	}
	keys.forEach((key) => {
		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.warn('Failed to clear autosave key', key, error);
		}
	});
}

function applyPreferredTheme(mode: ThemeMode): void {
	if (typeof document === 'undefined') {
		return;
	}

	const root = document.documentElement;
	const cleanupAutoListener = (): void => {
		if (autoThemeMediaQuery && autoThemeListener) {
			autoThemeMediaQuery.removeEventListener('change', autoThemeListener);
		}
		autoThemeMediaQuery = undefined;
		autoThemeListener = undefined;
	};

	const setTheme = (theme: 'light' | 'dark'): void => {
		root.setAttribute('data-theme', theme);
		root.style.colorScheme = theme;
	};

	if (mode === 'auto') {
		cleanupAutoListener();
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
			setTheme('dark');
			return;
		}

		autoThemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
		const syncTheme = (): void => {
			setTheme(autoThemeMediaQuery && autoThemeMediaQuery.matches ? 'light' : 'dark');
		};
		autoThemeListener = () => {
			syncTheme();
		};
		autoThemeMediaQuery.addEventListener('change', autoThemeListener);
		syncTheme();
		return;
	}

	cleanupAutoListener();
	setTheme(mode);
}

void bootstrap();
