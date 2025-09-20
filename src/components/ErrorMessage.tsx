import type { FC } from "react";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="rounded-lg border border-error/20 bg-error-container p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle size={20} className="mr-2 text-on-error-container" />
          <span className="text-sm font-medium text-on-error-container">{message}</span>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="ml-4 flex items-center rounded-full border border-error/30 bg-on-error-container px-4 py-2 text-sm font-medium text-on-error transition-all duration-200 hover:border-error/50 hover:bg-on-error-container/80 focus:outline-none focus:ring-2 focus:ring-error/20"
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
