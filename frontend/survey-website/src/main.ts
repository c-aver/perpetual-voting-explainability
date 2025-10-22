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
			const response_json = JSON.stringify(payload.dataById, null, 2);
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
				surveyCompleteElem.textContent = response_json;
			}

			console.log("Sending survey response to server...");
			console.log(response_json);
			const serverResponsePromise = fetch('http://localhost:8080/submit-response', {	// TODO: make address and port correctly configurable
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: response_json,
			});
			const serverResponseElem = app.querySelector('code#server-response');
			if (serverResponseElem) {
				console.log("Setting visibility");
				(serverResponseElem.parentNode as HTMLElement).style.visibility = 'hidden';
				serverResponsePromise
					.then(async (response) => {
						(serverResponseElem.parentNode as HTMLElement).style.visibility = 'visible';
						const text = await response.text();
						serverResponseElem.textContent = text;
					})
					.catch((error) => console.error(error));
			}
			
			clearAutosaveEntries(config.settings.autosaveKeysToClear);
		},
	});

	paginator.start();
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
