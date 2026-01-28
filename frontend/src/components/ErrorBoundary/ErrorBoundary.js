import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Algo deu errado
            </h2>
            <p className="text-gray-600 mb-6">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            <button
              onClick={this.handleRetry}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
