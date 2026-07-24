export function logError(error: unknown, context?: Record<string, unknown>) {
  // In a real application, this would send data to Sentry, Datadog, etc.
  console.error('[Error Logged]:', error, 'Context:', context);
}
