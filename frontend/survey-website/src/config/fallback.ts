import type { InstanceDayConfig, SurveyConfig, SurveyPageConfig } from './types.ts';
import { resolveQuestionOrderEndpoint } from './api-endpoints.ts';
import {
  instanceBasedExplanations,
  instanceDays,
  instanceVoters,
  llmGeneratedExplanations,
} from './instance-data.ts';
import textsCsv from './texts.csv?raw';

const TEXTS_CSV_URL = import.meta.env.VITE_TEXTS_CSV_URL;

function normalizeCsvUrl(url: string): string {
  if (!url || !url.includes('docs.google.com/spreadsheets')) {
    return url;
  }
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) {
    return url;
  }
  const docId = match[1];
  const gidMatch = url.match(/[?&]gid=(\d+)/);
  const gid = gidMatch ? gidMatch[1] : undefined;
  const params = new URLSearchParams({ format: 'csv' });
  if (gid) {
    params.set('gid', gid);
  }
  return `https://docs.google.com/spreadsheets/d/${docId}/export?${params.toString()}`;
}

function buildTextLookup(source: string): Record<string, string> {
  const map: Record<string, string> = {};
  const lines = source.split(/\r?\n/);
  for (const rawLine of lines) {
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) {
      continue;
    }
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let idx = 0; idx < rawLine.length; idx += 1) {
      const char = rawLine[idx];
      if (char === '"') {
        if (inQuotes && rawLine[idx + 1] === '"') {
          current += '"';
          idx += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (char === ',' && !inQuotes) {
        cells.push(current);
        current = '';
        continue;
      }
      current += char;
    }
    cells.push(current);
    if (!cells.length) {
      continue;
    }
    const key = (cells.shift() ?? '').trim();
    if (!key) {
      continue;
    }
    const valueRaw = cells.join(',').trim();
    const unquoted = valueRaw.startsWith('"') && valueRaw.endsWith('"')
      ? valueRaw.slice(1, -1).replace(/""/g, '"')
      : valueRaw;
    const value = unquoted.replace(/\\n/g, '\n');
    map[key] = value;
  }
  return map;
}

async function loadTextsCsv(): Promise<string> {
  if (!TEXTS_CSV_URL) {
    console.log("No CSV URL, loading from local...");
    return textsCsv;
  }
  if (typeof fetch !== 'function') {
    return textsCsv;
  }
  const normalizedUrl = normalizeCsvUrl(TEXTS_CSV_URL);
  try {
    const response = await fetch(normalizedUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch texts CSV: ${response.status} ${response.statusText}`);
    }
    console.log("Got CSV response!");
    return await response.text();
  } catch (error) {
    console.warn('Unable to load remote texts CSV, falling back to bundled copy.', error);
    return textsCsv;
  }
}

const texts = buildTextLookup(await loadTextsCsv());

const questionOrderingSource = resolveQuestionOrderEndpoint();

const instanceIds = [
  'simple',
  'complicated',
  'few_rounds',
  'few_voters'
]

const ruleIds = [
  'approval',
  'unit_cost',
  'equal_shares',
  'phragmen'
]

const explanationIds = [
  'none',
  'mechanical',
  'instance_based',
  'llm_generated'
]

const mechanicalExplanations: Record<string, string> = {
  'approval': texts['mechanicalExplanations:approval'],
  'unit_cost': texts['mechanicalExplanations:unit_cost'],
  'equal_shares': texts['mechanicalExplanations:equal_shares'],
  'phragmen': texts['mechanicalExplanations:phragmen'],
};


const introByType: Record<string, string> = {
  'approval': texts['introByType:approval'],
  'unit_cost': texts['introByType:unit_cost'],
  'equal_shares': texts['introByType:equal_shares'],
  'phragmen': texts['introByType:phragmen'],
}

const instanceRatingCopy = {
  prompt: texts['instanceRating:prompt'],
  minLabel: texts['instanceRating:minLabel'],
  maxLabel: texts['instanceRating:maxLabel'],
};

const ruleExplanationByType: Record<string, Record<string, string> | undefined> = {
  'none': undefined,
  'mechanical': mechanicalExplanations,
  'instance_based': mechanicalExplanations,
  'llm_generated': undefined,
}

function resolveInstanceDays(instanceId: string, ruleId: string): InstanceDayConfig[] {
  return instanceDays[instanceId]?.[ruleId] ?? [];
}

function resolveInstanceExplanations(instanceId: string, ruleId: string, explanationId: string): string[] | undefined {
  if (explanationId === 'instance_based') {
    return instanceBasedExplanations[instanceId]?.[ruleId];
  }
  if (explanationId === 'llm_generated') {
    return llmGeneratedExplanations[instanceId]?.[ruleId];
  }
  return undefined;
}

function shouldShowResultsExplanation(explanationId: string, explanations?: string[]): boolean {
  const wantsExplanation = explanationId === 'instance_based' || explanationId === 'llm_generated';
  return wantsExplanation && Boolean(explanations && explanations.length > 0);
}

function createInstancePages(): SurveyPageConfig[] {
  // instance-{instanceId}-{ruleId}-{explanationId}
  let result: SurveyPageConfig[] = [];
  for (const instanceId of instanceIds) {
    for (const ruleId of ruleIds) {
      for (const explanationId of explanationIds) {
        const days = resolveInstanceDays(instanceId, ruleId);
        const explanations = resolveInstanceExplanations(instanceId, ruleId, explanationId);
        result.push({
          type: 'instance',
          id: `instance-${instanceId}-${ruleId}-${explanationId}`,
          props: {
            title: texts['fallback.pages:instance:title'],
            introText: introByType[ruleId] + (ruleExplanationByType[explanationId] ? '\n' : '') + (ruleExplanationByType[explanationId]?.[ruleId] ?? ""),
            showResultsExplanation: shouldShowResultsExplanation(explanationId, explanations),
            voters: instanceVoters[instanceId] ?? [],
            explanations,
            days,
            rating: {
              scaleSize: 7,
              prompt: instanceRatingCopy.prompt,
              minLabel: instanceRatingCopy.minLabel,
              maxLabel: instanceRatingCopy.maxLabel,
            },
          },
        })
      }
    }
  }
  return result;
}

/**
 * Embedded configuration used when remote survey loading fails or is unavailable.
 */
export const fallbackSurveyConfig: SurveyConfig = {
  version: 'beta-1',
  settings: {
    showProgress: true,
    storageKey: 'perpetual-voting-survey',
    storageVersion: 'v2',
    direction: 'auto',
    autosaveKeysToClear: ['survey-open-response'],
    language: 'he-IL',
    pageSequenceSource: questionOrderingSource,
  },
  pages: [
    {
      type: 'text',
      id: 'intro',
      props: {
        title: texts['fallback.pages:intro:title'],
        body: texts['fallback.pages:intro:body'],
        footnote: texts['fallback.pages:intro:footnote'],
      },
    },
    {
      type: 'text',
      id: 'overview',
      props: {
        title: texts['fallback.pages:overview:title'],
        body: texts['fallback.pages:overview:body'],
        footnote: texts['fallback.pages:overview:footnote'],
      },
    },
    {
      type: 'textInput',
      id: 'feedback',
      props: {
        prompt: texts['fallback.pages:feedback:prompt'],
        helperText: texts['fallback.pages:feedback:helperText'],
        placeholder: texts['fallback.pages:feedback:placeholder'],
        rows: 8,
        required: false,
        maxLength: 800,
        autosaveKey: 'feedback',
      },
    },
    {
      type: 'questionnaire',
      id: 'demographic',
      props: {
        title: texts['fallback.pages:demographic:title'],
        description: texts['fallback.pages:demographic:description'],
        summaryKey: 'participant',
        questions: [
          {
            id: 'gender',
            prompt: texts['fallback.pages:demographic:questions:gender:prompt'],
            variant: 'select',
            required: true,
            placeholder: texts['fallback.pages:demographic:questions:gender:placeholder'],
            options: [
              { value: 'm', label: texts['fallback.pages:demographic:questions:gender:option:m'] },
              { value: 'f', label: texts['fallback.pages:demographic:questions:gender:option:f'] },
              { value: 'x', label: texts['fallback.pages:demographic:questions:gender:option:x'] },
            ],
            outputKey: ['gender'],
          },
          {
            id: 'education',
            prompt: texts['fallback.pages:demographic:questions:education:prompt'],
            variant: 'select',
            required: true,
            placeholder: texts['fallback.pages:demographic:questions:education:placeholder'],
            options: [
              { value: 'highschool', label: texts['fallback.pages:demographic:questions:education:option:highschool'] },
              { value: 'student', label: texts['fallback.pages:demographic:questions:education:option:student'] },
              { value: 'graduate', label: texts['fallback.pages:demographic:questions:education:option:graduate'] },
              { value: 'postgrad', label: texts['fallback.pages:demographic:questions:education:option:postgrad'] ?? 'תואר שני ומעלה' }
            ],
            outputKey: ['education'],
          },
          {
            id: 'age',
            prompt: texts['fallback.pages:demographic:questions:age:prompt'],
            variant: 'numeric',
            required: true,
            min: 0,
            step: 1,
            outputKey: ['age'],
            meta: { label: texts['fallback.pages:demographic:questions:age:meta:label'] },
          },
        ],
      },
    },
    {
      type: 'instance',
      id: 'perpetual-demo',
      props: {
        title: texts['fallback.pages:perpetual-demo:title'],
        introText:
          texts['fallback.pages:perpetual-demo:introText'],
        showResultsExplanation: true,
        voters: [
          { id: 1, label: texts['fallback.pages:perpetual-demo:voters:1:label'] },
          { id: 2, label: texts['fallback.pages:perpetual-demo:voters:2:label'] },
          { id: 3, label: texts['fallback.pages:perpetual-demo:voters:3:label'] },
        ],
        explanations: [
          texts['fallback.pages:perpetual-demo:explanations:0'],
          texts['fallback.pages:perpetual-demo:explanations:1'],
          texts['fallback.pages:perpetual-demo:explanations:2'],
          texts['fallback.pages:perpetual-demo:explanations:3'],
          texts['fallback.pages:perpetual-demo:explanations:4'],
          texts['fallback.pages:perpetual-demo:explanations:5'],
        ],
        days: [
          {
            day: 1,
            winner: 'A',
            votes: [
              { voterId: 1, selections: ['A', 'B'] },
              { voterId: 2, selections: ['A', 'B'] },
              { voterId: 3, selections: ['A'] },
            ],
          },
          {
            day: 2,
            winner: 'B',
            votes: [
              { voterId: 1, selections: ['B', 'C'] },
              { voterId: 2, selections: ['B'] },
              { voterId: 3, selections: ['C', 'A'] },
            ],
          },
          {
            day: 3,
            winner: 'C',
            votes: [
              { voterId: 1, selections: ['C', 'B'] },
              { voterId: 2, selections: ['C'] },
              { voterId: 3, selections: ['C', 'A'] },
            ],
          },
          {
            day: 4,
            winner: 'A',
            votes: [
              { voterId: 1, selections: ['A', 'B'] },
              { voterId: 2, selections: ['A', 'B'] },
              { voterId: 3, selections: ['A'] },
            ],
          },
          {
            day: 5,
            winner: 'B',
            votes: [
              { voterId: 1, selections: ['B', 'C'] },
              { voterId: 2, selections: ['B'] },
              { voterId: 3, selections: ['C', 'A'] },
            ],
          },
          {
            day: 6,
            winner: 'C',
            votes: [
              { voterId: 1, selections: ['C', 'B'] },
              { voterId: 2, selections: ['C'] },
              { voterId: 3, selections: ['C', 'A'] },
            ],
          },
        ],
        rating: {
          scaleSize: 7,
          prompt: texts['fallback.pages:perpetual-demo:rating:prompt'],
          minLabel: texts['fallback.pages:perpetual-demo:rating:minLabel'],
          maxLabel: texts['fallback.pages:perpetual-demo:rating:maxLabel'],
        },
      },
    },
    {
      type: 'text',
      id: 'thank-you',
      props: {
        title: texts['fallback.pages:thank-you:title'],
        body: texts['fallback.pages:thank-you:body'],
        footnote: texts['fallback.pages:thank-you:footnote'],
      },
    },
    ...createInstancePages(),
  ],
};
