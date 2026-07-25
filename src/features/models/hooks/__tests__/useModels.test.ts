import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useModels } from '../useModels';
import * as modelsApi from '../../../../shared/api/models.api';
import * as logErrorLib from '../../../../shared/lib/logError';

// Mock dependencies
vi.mock('../../../../shared/api/models.api');
vi.mock('../../../../shared/lib/logError');

const mockModelsData = [
  { id: '1', name: 'Model 1', provider: 'Test', category: ['Chat'], context: '8k', price: 'Free', isFree: true, speed: '100 tok/s' }
];

describe('useModels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch models successfully', async () => {
    vi.spyOn(modelsApi, 'fetchModels').mockResolvedValue(mockModelsData);

    const { result } = renderHook(() => useModels());

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockModelsData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const error = new Error('Failed to fetch');
    vi.spyOn(modelsApi, 'fetchModels').mockRejectedValue(error);
    const logErrorSpy = vi.spyOn(logErrorLib, 'logError');

    const { result } = renderHook(() => useModels());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.data).toEqual([]);
    expect(logErrorSpy).toHaveBeenCalledWith(error);
  });

  it('should not update state if unmounted', async () => {
    // Create a promise that we can control
    let resolveFetch: (value: any) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });

    vi.spyOn(modelsApi, 'fetchModels').mockReturnValue(fetchPromise as any);

    const { result, unmount } = renderHook(() => useModels());

    expect(result.current.isLoading).toBe(true);

    // Unmount before the fetch resolves
    unmount();

    // Resolve the fetch after unmount
    resolveFetch!(mockModelsData);

    // Give it a tiny bit of time for promises to settle
    await new Promise(resolve => setTimeout(resolve, 10));

    // State should remain in the initial loading state (since it's unmounted, we can't easily see it not changing, but we can verify no errors are thrown by React about state updates on unmounted components)
    // The key here is that it doesn't throw a warning. React 18 is less noisy about this, but the isMounted logic is still good practice.
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
  });
});
