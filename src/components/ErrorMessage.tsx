import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
      <AlertCircle size={20} className="mr-2 text-red-500" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;