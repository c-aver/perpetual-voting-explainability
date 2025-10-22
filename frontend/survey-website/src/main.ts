import './style.css';
import { TextPage } from './pages/text-page.ts';
import { TextInputPage, type TextInputPageProps, type TextInputPageResult } from './pages/text-input-page.ts';
import {
	QuestionnairePage,
	type QuestionnairePageProps,
	type QuestionnairePageResult,
} from './pages/questionnaire/questionnaire-page.ts';
import { Paginator, type PageRegistry } from './pagination/paginator.ts';
import type { PageFactoryContext } from './pagination/types.ts';
import type { TextPageProps } from './pages/text-page.ts';
import { loadSurveyConfig } from './config/loader.ts';
import type { LoadedSurveyConfig, TextDirection } from './config/types.ts';

const registry: PageRegistry = {
	text: (context) => new TextPage(context as PageFactoryContext<TextPageProps, void>),
	textInput: (context) =>
		new TextInputPage(context as PageFactoryContext<TextInputPageProps, TextInputPageResult>),
	questionnaire: (context) =>
		new QuestionnairePage(
			context as PageFactoryContext<QuestionnairePageProps, QuestionnairePageResult>,
		),
};

async function bootstrap(): Promise<void> {
	const app = document.querySelector<HTMLDivElement>('#app');
	if (!app) {
		throw new Error('Failed to locate #app container.');
	}

	let config: LoadedSurveyConfig;
	try {
		config = await loadSurveyConfig();
	} catch (error) {
		console.error('Unable to load survey configuration.', error);
		app.innerHTML = '<p>Failed to load survey definition.</p>';
		return;
	}

	updateDocumentMetadata(config);
	applyDocumentLanguage(config.settings.language);
	applyDocumentDirection(config.settings.direction);

	if (config.pages.length === 0) {
		app.innerHTML = '<p>No survey pages are configured.</p>';
		return;
	}

	const paginator = new Paginator(app, config.pages, registry, {
		showProgress: config.settings.showProgress,
		storageKey: config.settings.storageKey,
		storageVersion: config.settings.storageVersion,
		direction: config.settings.direction,
		onReset: () => {
			clearAutosaveEntries(config.settings.autosaveKeysToClear);
		},
		onComplete: (payload) => {
			paginator.dispose();
			const responseJson = JSON.stringify(payload.dataById, null, 2);
			const submitEndpoint = resolveSubmitEndpoint();
			app.innerHTML = `
				<div class="survey-complete">
					<h2>Thank you!</h2>
					<p>Your responses have been recorded.</p>
					<pre class="json-display"><code id="survey-complete" dir="ltr"></code></pre>
					<pre class="json-display"><code id="server-response" dir="ltr"></code></pre>
				</div>
			`;
			const surveyCompleteElem = app.querySelector('code#survey-complete');
			if (surveyCompleteElem) {
				surveyCompleteElem.textContent = responseJson;
			}

			console.log('Sending survey response to server...');
			console.log(responseJson);
			console.log('POST', submitEndpoint);
			const serverResponsePromise = fetch(submitEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: responseJson,
			});
			const serverResponseElem = app.querySelector('code#server-response');
			const serverResponseContainer = serverResponseElem?.parentElement ?? null;
			if (serverResponseContainer && serverResponseElem) {
				serverResponseContainer.style.visibility = 'visible';
				serverResponseElem.textContent = 'Submitting response...';
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
						serverResponseElem.textContent = `Submission failed: ${error instanceof Error ? error.message : String(error)}`;
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

function resolveSubmitEndpoint(): string {
	const env = import.meta.env as Record<string, string | undefined>;
	const defaultOrigin = getDefaultOrigin();
	const baseUrl = env.VITE_SURVEY_API_BASE_URL?.trim();
	const protocol = env.VITE_SURVEY_API_PROTOCOL?.replace(/:$/, '').trim();
	const host = env.VITE_SURVEY_API_HOST?.trim();
	const port = env.VITE_SURVEY_API_PORT?.trim();
	const path = env.VITE_SURVEY_API_PATH?.trim() || '/submit-response';

	const normalizedPath = path.startsWith('/') ? path : `/${path}`;

	const originFromComponents = () => {
		if (!host && !protocol && !port) {
			return undefined;
		}
		const effectiveProtocol = protocol || extractProtocol(defaultOrigin) || 'http';
		const effectiveHost = host || extractHost(defaultOrigin) || 'localhost';
		const effectivePort = port ?? extractPort(defaultOrigin) ?? '';
		const portSegment = effectivePort ? `:${effectivePort}` : '';
		return `${effectiveProtocol}://${effectiveHost}${portSegment}`;
	};

	const originCandidate = baseUrl || originFromComponents() || defaultOrigin;

	try {
		return new URL(normalizedPath, originCandidate).toString();
	} catch (error) {
		console.warn('Invalid survey API configuration; falling back to default origin.', error);
		return new URL(normalizedPath, defaultOrigin).toString();
	}
}

function getDefaultOrigin(): string {
	if (typeof window !== 'undefined' && window.location) {
		const { origin, hostname } = window.location;
		if (hostname === 'localhost' || hostname === '127.0.0.1') {
			return 'http://localhost:8080';
		}
		if (origin) {
			return origin;
		}
	}
	return 'http://localhost:8080';
}

function extractProtocol(origin: string | undefined): string | undefined {
	if (!origin) {
		return undefined;
	}
	try {
		const protocol = new URL(origin).protocol;
		return protocol ? protocol.replace(/:$/, '') : undefined;
	} catch (error) {
		console.warn('Unable to parse protocol from origin.', origin, error);
		return undefined;
	}
}

function extractHost(origin: string | undefined): string | undefined {
	if (!origin) {
		return undefined;
	}
	try {
		return new URL(origin).hostname;
	} catch (error) {
		console.warn('Unable to parse host from origin.', origin, error);
		return undefined;
	}
}

function extractPort(origin: string | undefined): string | undefined {
	if (!origin) {
		return undefined;
	}
	try {
		const port = new URL(origin).port;
		return port || undefined;
	} catch (error) {
		console.warn('Unable to parse port from origin.', origin, error);
		return undefined;
	}
}

function applyDocumentDirection(direction: TextDirection): void {
	if (typeof document === 'undefined') {
		return;
	}
	document.documentElement.setAttribute('dir', direction);
}

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

function updateDocumentMetadata(config: LoadedSurveyConfig): void {
	if (typeof document === 'undefined') {
		return;
	}
	const title = typeof config.meta?.title === 'string' ? config.meta.title : undefined;
	if (title) {
		document.title = title;
	}
}

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

void bootstrap();
