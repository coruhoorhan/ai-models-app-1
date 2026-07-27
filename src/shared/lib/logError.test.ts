import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logError } from './logError';

describe('logError', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.error and mock its implementation to prevent actual console output during tests
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.error after each test
    consoleErrorSpy.mockRestore();
  });

  it('should log the error message correctly when called with only an error', () => {
    const testError = new Error('Test error message');

    logError(testError);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Error Logged]:', testError, 'Context:', undefined);
  });

  it('should log the error and context correctly when called with both', () => {
    const testError = new Error('Test error with context');
    const testContext = { userId: 123, action: 'test_action' };

    logError(testError, testContext);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Error Logged]:', testError, 'Context:', testContext);
  });

  it('should handle non-Error objects correctly', () => {
    const testStringError = 'A simple string error';

    logError(testStringError);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Error Logged]:', testStringError, 'Context:', undefined);
  });
});
