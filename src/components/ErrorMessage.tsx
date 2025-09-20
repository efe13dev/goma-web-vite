import type { FC } from "react";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
      <div className="flex items-center">
        <AlertCircle size={20} className="mr-2 text-red-500" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="ml-4 flex items-center rounded-md bg-red-100 px-3 py-1 text-red-700 transition-colors hover:bg-red-200"
        >
          <RefreshCw size={16} className="mr-1" />
          <span>Reintentar</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
