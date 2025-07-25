// ErrorBoundary.js
import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Log error
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-100 text-red-700 rounded">Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
