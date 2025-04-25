import type { FC } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <AlertCircle size={20} className="mr-2 text-red-500" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="ml-4 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md flex items-center transition-colors"
        >
          <RefreshCw size={16} className="mr-1" />
          <span>Reintentar</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;