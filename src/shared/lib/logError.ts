import * as Sentry from '@sentry/react';

export function logError(error: unknown, context?: Record<string, unknown>) {
  console.error('[Error Logged]:', error, 'Context:', context);
  
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}

export function initSentry() {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN || "",
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 1.0,
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}
