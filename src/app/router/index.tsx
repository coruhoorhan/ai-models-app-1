import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { PageLoader } from '../../shared/ui/PageLoader';

const DashboardPage = lazy(() => import('../../pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const LandingPage = lazy(() => import('../../pages/LandingPage').then(m => ({ default: m.LandingPage })));
const UsageLogsPage = lazy(() => import('../../pages/UsageLogsPage').then(m => ({ default: m.UsageLogsPage })));
const ModelsPage = lazy(() => import('../../pages/ModelsPage').then(m => ({ default: m.ModelsPage })));
const RankingsPage = lazy(() => import('../../pages/RankingsPage').then(m => ({ default: m.RankingsPage })));
const PricingPage = lazy(() => import('../../pages/PricingPage').then(m => ({ default: m.PricingPage })));
const ChatPage = lazy(() => import('../../pages/ChatPage').then(m => ({ default: m.ChatPage })));
const DocsPage = lazy(() => import('../../pages/DocsPage').then(m => ({ default: m.DocsPage })));
const ApiKeysPage = lazy(() => import('../../pages/ApiKeysPage').then(m => ({ default: m.ApiKeysPage })));
const PlaceholderPage = lazy(() => import('../../pages/PlaceholderPage').then(m => ({ default: m.PlaceholderPage })));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(LandingPage),
  },
  {
    path: '/rankings',
    element: withSuspense(RankingsPage),
  },
  {
    path: '/pricing',
    element: withSuspense(PricingPage),
  },
  {
    path: '/chat',
    element: withSuspense(ChatPage),
  },
  {
    path: '/docs',
    element: withSuspense(DocsPage),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: withSuspense(DashboardPage),
      },
      {
        path: '/logs',
        element: withSuspense(UsageLogsPage),
      },
      {
        path: '/models',
        element: withSuspense(ModelsPage),
      },
      {
        path: '/keys',
        element: withSuspense(ApiKeysPage),
      },
      {
        path: '/billing',
        element: withSuspense(() => <PlaceholderPage title="Billing & Invoices" />),
      },
      {
        path: '/affiliate',
        element: withSuspense(() => <PlaceholderPage title="Affiliate Program" />),
      },
      {
        path: '/settings',
        element: withSuspense(() => <PlaceholderPage title="Account Settings" />),
      },
      {
        path: '/inspector',
        element: withSuspense(() => <PlaceholderPage title="Live Router Inspector" />),
      }
    ]
  }
]);
