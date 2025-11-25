const DEFAULT_SUBMIT_PATH = '/submit-response';
const DEFAULT_QUESTION_ORDER_PATH = '/get-questions';

type EnvRecord = Record<string, string | undefined>;

function getEnv(): EnvRecord {
  return import.meta.env as EnvRecord;
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

function buildOriginFromEnv(env: EnvRecord, defaultOrigin: string): string {
  const baseUrl = env.VITE_SURVEY_API_BASE_URL?.trim();
  const protocol = env.VITE_SURVEY_API_PROTOCOL?.replace(/:$/, '').trim();
  const host = env.VITE_SURVEY_API_HOST?.trim();
  const port = env.VITE_SURVEY_API_PORT?.trim();

  if (baseUrl) {
    return baseUrl;
  }

  if (protocol || host || port) {
    const fallbackProtocol = extractProtocol(defaultOrigin) || 'http';
    const fallbackHost = extractHost(defaultOrigin) || 'localhost';
    const fallbackPort = extractPort(defaultOrigin) || '';
    const effectiveProtocol = protocol || fallbackProtocol;
    const effectiveHost = host || fallbackHost;
    const effectivePort = port ?? fallbackPort;
    const portSegment = effectivePort ? `:${effectivePort}` : '';
    return `${effectiveProtocol}://${effectiveHost}${portSegment}`;
  }

  return defaultOrigin;
}

function normalizePath(pathCandidate: string | undefined, fallbackPath: string): string {
  const path = pathCandidate?.trim();
  if (!path || path.length === 0) {
    return fallbackPath;
  }

  if (/^https?:/i.test(path)) {
    return path;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function resolveEndpoint(pathCandidate: string | undefined, fallbackPath: string): string {
  const env = getEnv();
  const defaultOrigin = getDefaultOrigin();
  const normalizedPath = normalizePath(pathCandidate, fallbackPath);

  if (/^https?:/i.test(normalizedPath)) {
    return normalizedPath;
  }

  const originCandidate = buildOriginFromEnv(env, defaultOrigin);

  try {
    return new URL(normalizedPath, originCandidate).toString();
  } catch (error) {
    console.warn('Invalid survey API configuration; falling back to default origin.', error);
    return new URL(normalizedPath, defaultOrigin).toString();
  }
}

export function resolveSubmitEndpoint(): string {
  const env = getEnv();
  return resolveEndpoint(env.VITE_SURVEY_API_PATH, DEFAULT_SUBMIT_PATH);
}

export function resolveQuestionOrderEndpoint(): string {
  const env = getEnv();
  const path = env.VITE_SURVEY_API_QUESTION_PATH ?? DEFAULT_QUESTION_ORDER_PATH;
  return resolveEndpoint(path, DEFAULT_QUESTION_ORDER_PATH);
}

export function getSurveyApiDefaultOrigin(): string {
  return getDefaultOrigin();
}