import React, { type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Component để bắt lỗi trong React
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Cập nhật trạng thái khi có lỗi xảy ra
   * @param error
   * @returns
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });

    console.error("Lỗi đã được bắt bởi ErrorBoundary:", error, errorInfo);

    // Gửi lỗi đến dịch vụ giám sát lỗi nếu cần
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback or default error UI
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
              {/* Error Icon */}
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-red-100 p-4">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 0v2m0-2v-2m0-2V9m0 0V7m0 2V9m0 0h0"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Title */}
              <h1 className="mb-2 text-center text-xl font-bold text-gray-900">
                Chờ xíu! Có lỗi xảy ra
              </h1>

              {/* Error Message */}
              <p className="mb-4 text-center text-gray-600">
                Chúng tôi xin lỗi vì sự bất tiện này. Đã xảy ra lỗi không mong
                muốn. Vui lòng thử lại hoặc quay lại trang chủ.
              </p>

              {/* Error Details (Development only) */}
              {import.meta.env.MODE === "development" && this.state.error && (
                <details className="mb-4 rounded bg-gray-100 p-3 text-left">
                  <summary className="cursor-pointer font-mono text-sm font-bold text-gray-700">
                    Error Details
                  </summary>
                  <pre className="mt-2 overflow-auto text-xs text-gray-600">
                    {this.state.error.toString()}
                    {"\n\n"}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={this.handleReset}
                  className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Thử lại
                </button>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Quay về trang chủ
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
