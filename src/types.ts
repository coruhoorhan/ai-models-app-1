import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
}

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface Metric {
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export interface ModelUsage {
  modelId: string;
  modelName: string;
  provider: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsed: string | null;
}

// Docs Types
export interface CodeSnippets {
  ts?: string;
  python?: string;
  curl?: string;
  json?: string;
}

export interface ParamDef {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DocArticle {
  id: string;
  categoryId: string;
  title: string;
  subtitle?: string;
  content: string;
  codeSnippets?: CodeSnippets;
  paramTable?: ParamDef[];
}

export interface DocCategory {
  id: string;
  title: string;
  iconName: string;
  articles: DocArticle[];
}

// Ranking & Component Inventory Types

export interface TickerBarProps {
  items: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
  speed?: 'slow' | 'normal' | 'fast';
}

export interface BadgeCategoryProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'status-live' | 'error';
  icon?: LucideIcon;
}

export interface KeyDisplayFieldProps {
  label: string;
  value: string;
  onCopy?: () => void;
  isSecret?: boolean;
}

export interface SegmentedTabProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  section?: 'primary' | 'secondary' | 'bottom-group';
}

export interface ChartCardScatterProps {
  title: string;
  data: any[];
  xKey: string;
  yKey: string;
  zKey?: string;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  xLabel?: string;
  yLabel?: string;
  tooltipFormatter?: (value: any) => string;
}

export interface HighlightListItemProps {
  title: string;
  subtitle?: string;
  delta?: { value: string; isPositive: boolean };
  priceText?: string;
}

export interface CostSimulatorCardProps {
  title: string;
  volumeOptions: { id: string; label: string; value: number }[];
  activeVolume: string;
  onVolumeChange: (id: string) => void;
  models: { name: string; cost: string; percentage: number }[];
}

export interface MethodologyTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface EmptyStateBlockProps {
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface SkeletonLoaderProps {
  type: 'card' | 'table' | 'stat' | 'list';
  count?: number;
}

export interface ErrorStateBlockProps {
  message: string;
  onRetry?: () => void;
}

export interface TopNavProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}
