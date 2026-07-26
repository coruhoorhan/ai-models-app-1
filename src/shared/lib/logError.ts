/**
 * Merkezi Hata Loglama Mekanizması
 * ENGINEERING-STANDARDS.md - Section 1: Observability
 */

interface ErrorContext {
  feature?: string;
  action?: string;
  endpoint?: string;
  [key: string]: unknown;
}

export function logError(error: unknown, context?: ErrorContext) {
  // Production'da Sentry gibi servislere gönderilebilir.
  // Şu an için detaylı olarak konsola basıyoruz.
  const errorObj = error instanceof Error ? error : new Error(String(error));

  console.error(`[ERROR] ${context?.feature || 'System'}:`, {
    message: errorObj.message,
    stack: errorObj.stack,
    context,
  });

  // TODO: İleride monitoring tool'larına (Sentry, Datadog vb.) entegrasyon burada yapılacak.
}
