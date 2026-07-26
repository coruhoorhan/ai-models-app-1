import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

// ⚡ Bolt Optimization: Lazy load route components to reduce initial bundle size.
// Impact: Reduces the main initial JavaScript chunk significantly (e.g. from ~940kB to ~325kB).
const LazyLandingPage = lazy(() => import('../../pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LazyRankingsPage = lazy(() => import('../../pages/RankingsPage').then(m => ({ default: m.RankingsPage })));
const LazyPricingPage = lazy(() => import('../../pages/PricingPage').then(m => ({ default: m.PricingPage })));
const LazyDashboardPage = lazy(() => import('../../pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const LazyUsageLogsPage = lazy(() => import('../../pages/UsageLogsPage').then(m => ({ default: m.UsageLogsPage })));
const LazyModelsPage = lazy(() => import('../../pages/ModelsPage').then(m => ({ default: m.ModelsPage })));

const PageFallback = () => (
  <div className="w-full min-h-screen flex items-center justify-center bg-canvas text-subtle text-body-sm">
    <div className="w-5 h-5 rounded-full border-2 border-chart-teal border-t-transparent animate-spin mr-sm" />
    Loading...
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<PageFallback />}><LazyLandingPage /></Suspense>,
  },
  {
    path: '/rankings',
    element: <Suspense fallback={<PageFallback />}><LazyRankingsPage /></Suspense>,
  },
  {
    path: '/pricing',
    element: <Suspense fallback={<PageFallback />}><LazyPricingPage /></Suspense>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Suspense fallback={<PageFallback />}><LazyDashboardPage /></Suspense>,
      },
      {
        path: '/logs',
        element: <Suspense fallback={<PageFallback />}><LazyUsageLogsPage /></Suspense>,
      },
      {
        path: '/models',
        element: <Suspense fallback={<PageFallback />}><LazyModelsPage /></Suspense>,
      }
    ]
  }
]);
