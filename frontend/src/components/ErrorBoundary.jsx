import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrrorBoundary responded:", error, errorInfo); 
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-5">
          <h2>Something is wrong</h2>
          <p>Please, reload the page or try again later</p>
          <p className="font-courier text-blue-700">{this.state.error && this.state.error.message}</p>
        </div>
      )
    }
    return this.props.children;
  }
}