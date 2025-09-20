import type { FC } from "react";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="border-error/20 bg-error-container rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle size={20} className="text-on-error-container mr-2" />
          <span className="text-on-error-container text-sm font-medium">{message}</span>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="bg-error text-on-error hover:bg-error/90 ml-4 rounded-full px-3 py-1 transition-colors"
          >
            <RefreshCw size={16} className="mr-1" />
            <span>Reintentar</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
