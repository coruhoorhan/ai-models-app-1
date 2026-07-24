import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { AuthProvider } from './app/providers/AuthProvider';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
