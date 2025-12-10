import './style.css';
import { TextPage } from './pages/text-page.ts';
import { TextInputPage, type TextInputPageProps, type TextInputPageResult } from './pages/text-input-page.ts';
import {
	QuestionnairePage,
	type QuestionnairePageProps,
	type QuestionnairePageResult,
} from './pages/questionnaire/questionnaire-page.ts';
import { InstancePage, type InstancePageResult } from './pages/instance/instance-page.ts';
import { Paginator, type PageRegistry } from './pagination/paginator.ts';
import type { PageFactoryContext } from './pagination/types.ts';
import type { TextPageProps } from './pages/text-page.ts';
import { loadSurveyConfig } from './config/loader.ts';
import { resolveCopyCatalog } from './config/copy.ts';
import type { InstancePagePropsConfig, LoadedSurveyConfig, TextDirection } from './config/types.ts';
import { resolveSubmitEndpoint } from './config/api-endpoints.ts';

type ThemeMode = 'auto' | 'light' | 'dark';

const DEFAULT_THEME: ThemeMode = 'light'; // Set to 'auto' to follow system preference

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
			const submission = {
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

			app.innerHTML = `
				<div class="survey-complete">
					<h2>${completionCopy.heading}</h2>
					<p>${completionCopy.body}</p>
					<h3>${completionCopy.serverHeading}</h3>
					<pre class="json-display"><code id="server-response" dir="ltr"></code></pre>
					<h3>${completionCopy.responseHeading}</h3>
					<pre class="json-display"><code id="survey-complete" dir="ltr"></code></pre>
				</div>
			`;
			const surveyCompleteElem = app.querySelector('code#survey-complete');
			if (surveyCompleteElem) {
				surveyCompleteElem.textContent = submissionJson;
			}

			console.log('Sending survey response to server...');
			console.log(submissionJson);
			console.log('POST', submitEndpoint);
			const serverResponsePromise = fetch(submitEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: submissionJson,
			});
			const serverResponseElem = app.querySelector('code#server-response');
			const serverResponseContainer = serverResponseElem?.parentElement ?? null;
			if (serverResponseContainer && serverResponseElem) {
				serverResponseContainer.style.visibility = 'visible';
				serverResponseElem.textContent = completionCopy.submissionPending;
				void serverResponsePromise
					.then(async (response) => {
						const text = await response.text();
						serverResponseElem.textContent = text;
						if (!response.ok) {
							console.error('Submission failed', response.status, response.statusText, text);
						}
					})
					.catch((error) => {
						console.error('Failed to submit survey response', error);
						const errorMessage = error instanceof Error ? error.message : String(error);
						serverResponseElem.textContent = `${completionCopy.submissionFailedPrefix} ${errorMessage}`;
					});
			}
			void serverResponsePromise.catch((error) => {
				if (!serverResponseElem) {
					console.error('Failed to submit survey response', error);
				}
			});

			clearAutosaveEntries(config.settings.autosaveKeysToClear);
		},
	});

	paginator.start();
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
