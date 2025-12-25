/*
 * Runtime configuration loaded before the survey app boots.
 * Update `textsSource` to 'local', 'remote', or 'auto' and redeploy
 * to control where the fallback texts CSV is fetched from.
 */
window.__SURVEY_TEXTS_CONFIG__ = {
  textsSource: 'local',
};
