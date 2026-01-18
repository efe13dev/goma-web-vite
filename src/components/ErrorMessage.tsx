import type { FC } from "react";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="md-card border-error/25 bg-error-container p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle size={20} className="mr-2 text-on-error-container" />
          <span className="text-sm font-medium text-on-error-container">{message}</span>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="md-btn ml-4 bg-on-error-container text-on-error hover:bg-on-error-container/85 focus:ring-error/25"
          >
            <RefreshCw size={16} className="mr-2" />
            <span>Reintentar</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
