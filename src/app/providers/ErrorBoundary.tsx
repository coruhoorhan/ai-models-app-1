import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { logError } from '../../shared/lib/logError';
import { Button } from '../../shared/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, { errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-canvas p-lg text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-md">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <h1 className="text-heading-sm text-ink mb-sm">Something went wrong</h1>
          <p className="text-body-sm text-muted mb-lg max-w-md">
            An unexpected error occurred. Our team has been notified.
          </p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
