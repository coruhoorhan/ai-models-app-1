import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useDashboardChart, useDashboardStats } from './useDashboardData';
import * as dashboardApi from '../../../shared/api/dashboard.api';
import * as logErrorModule from '../../../shared/lib/logError';
import type { ChartDataPoint, DashboardStats } from '../../../shared/api/dashboard.api';

// Modülleri mockla
vi.mock('../../../shared/api/dashboard.api', () => ({
  fetchDashboardChart: vi.fn(),
  fetchDashboardStats: vi.fn(),
}));

vi.mock('../../../shared/lib/logError', () => ({
  logError: vi.fn(),
}));

describe('useDashboardData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useDashboardChart', () => {
    it('should initially be loading and have empty data', () => {
      // Bekletilen bir promise dönüyoruz
      vi.mocked(dashboardApi.fetchDashboardChart).mockReturnValue(new Promise(() => {}));

      const { result } = renderHook(() => useDashboardChart('7d'));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it('should successfully fetch and return chart data', async () => {
      const mockData: ChartDataPoint[] = [
        { name: 'Mon', gpt: 4000, claude: 2400, gemini: 2400 },
        { name: 'Tue', gpt: 3000, claude: 1398, gemini: 2210 },
      ];
      vi.mocked(dashboardApi.fetchDashboardChart).mockResolvedValue(mockData);

      const { result } = renderHook(() => useDashboardChart('7d'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
      expect(dashboardApi.fetchDashboardChart).toHaveBeenCalledWith('7d');
    });

    it('should correctly set error and call logError when fetch fails', async () => {
      const mockError = new Error('Failed to fetch chart data');
      vi.mocked(dashboardApi.fetchDashboardChart).mockRejectedValue(mockError);

      const { result } = renderHook(() => useDashboardChart('7d'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual([]);
      expect(result.current.error).toEqual(mockError);
      expect(logErrorModule.logError).toHaveBeenCalledWith(mockError);
    });

    it('should handle non-Error instances gracefully', async () => {
      const stringError = 'Some string error';
      vi.mocked(dashboardApi.fetchDashboardChart).mockRejectedValue(stringError);

      const { result } = renderHook(() => useDashboardChart('7d'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Unknown error');
      expect(logErrorModule.logError).toHaveBeenCalledWith(stringError);
    });
  });

  describe('useDashboardStats', () => {
    it('should successfully fetch and return stats data', async () => {
      const mockStats: DashboardStats = {
        balance: "$4,250.00",
        consumption: "$142.50",
        requests: "1.2M",
        statisticalCount: "842,104",
        quota: "$5,000.00",
        tokens: "45.2M",
        averageRpm: "4,520",
        averageTpm: "185K",
      };
      vi.mocked(dashboardApi.fetchDashboardStats).mockResolvedValue(mockStats);

      const { result } = renderHook(() => useDashboardStats());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockStats);
      expect(result.current.error).toBeNull();
    });

    it('should correctly set error and call logError when stats fetch fails', async () => {
       const mockError = new Error('Failed to fetch stats data');
       vi.mocked(dashboardApi.fetchDashboardStats).mockRejectedValue(mockError);

       const { result } = renderHook(() => useDashboardStats());

       await waitFor(() => {
         expect(result.current.isLoading).toBe(false);
       });

       expect(result.current.data).toBeNull();
       expect(result.current.error).toEqual(mockError);
       expect(logErrorModule.logError).toHaveBeenCalledWith(mockError);
    });
  });
});
