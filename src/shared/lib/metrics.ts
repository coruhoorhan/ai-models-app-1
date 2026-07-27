export function trackMetric(name: string, value: number, tags?: Record<string, string>) {
  // In a real application, send to Datadog, Prometheus, etc.
  if (import.meta.env.DEV) {
    console.log(`[Metric] ${name}: ${value}`, tags || {});
  }
}

export function trackPerformance(operation: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  trackMetric(`${operation}_duration_ms`, end - start);
}

export async function trackPerformanceAsync<T>(operation: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    const end = performance.now();
    trackMetric(`${operation}_duration_ms`, end - start);
  }
}
