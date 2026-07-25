import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchDashboardChart } from './dashboard.api';

describe('fetchDashboardChart', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return data with multiplier 0.5 for 24h range', async () => {
    const promise = fetchDashboardChart('24h');
    vi.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toHaveLength(7);
    expect(result[0].gpt).toBe(4000 * 0.5);
    expect(result[0].claude).toBe(2400 * 0.5);
    expect(result[0].gemini).toBe(2400 * 0.5);
  });

  it('should return data with multiplier 4 for 30d range', async () => {
    const promise = fetchDashboardChart('30d');
    vi.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toHaveLength(7);
    expect(result[0].gpt).toBe(4000 * 4);
    expect(result[0].claude).toBe(2400 * 4);
    expect(result[0].gemini).toBe(2400 * 4);
  });

  it('should return data with multiplier 10 for all range', async () => {
    const promise = fetchDashboardChart('all');
    vi.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toHaveLength(7);
    expect(result[0].gpt).toBe(4000 * 10);
    expect(result[0].claude).toBe(2400 * 10);
    expect(result[0].gemini).toBe(2400 * 10);
  });

  it('should return data with multiplier 1 for default (7d) range', async () => {
    const promise = fetchDashboardChart('7d');
    vi.advanceTimersByTime(500);
    const result = await promise;

    expect(result).toHaveLength(7);
    expect(result[0].gpt).toBe(4000 * 1);
    expect(result[0].claude).toBe(2400 * 1);
    expect(result[0].gemini).toBe(2400 * 1);
  });
});
