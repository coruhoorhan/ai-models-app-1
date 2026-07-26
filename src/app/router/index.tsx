import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../../pages/DashboardPage';
import { LandingPage } from '../../pages/LandingPage';
import { UsageLogsPage } from '../../pages/UsageLogsPage';
import { ModelsPage } from '../../pages/ModelsPage';
import { RankingsPage } from '../../pages/RankingsPage';
import { PricingPage } from '../../pages/PricingPage';
import { ChatPage } from '../../pages/ChatPage';
import { DocsPage } from '../../pages/DocsPage';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/rankings',
    element: <RankingsPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/docs',
    element: <DocsPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/logs',
        element: <UsageLogsPage />,
      },
      {
        path: '/models',
        element: <ModelsPage />,
      }
    ]
  }
]);
