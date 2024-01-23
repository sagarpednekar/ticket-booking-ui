/**
 * ErrorBoundary is a React component that acts as an error boundary,
 * catching JavaScript errors anywhere in its component tree.
 * It logs the errors and displays a fallback UI to prevent the entire
 * application from crashing due to a single error.
 */
import React, { Component, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Constructor for ErrorBoundary component.
   * @param props - React props containing children.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method that allows the component to catch JavaScript errors during rendering.
   * It returns an object to update the state, indicating that an error occurred.
   * @param error - The caught error.
   * @returns An object to update the state.
   */
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  /**
   * Lifecycle method called after an error has been thrown.
   * It can be used to log the error or perform additional actions.
   * @param error - The caught error.
   * @param errorInfo - Information about the error.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service or perform additional actions
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  /**
   * Render method of ErrorBoundary component.
   * It renders the children or a fallback UI if an error occurred.
   * @returns The rendered React elements.
   */
  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI here
      return <div>Something went wrong.</div>;
    }

    // Render the children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
