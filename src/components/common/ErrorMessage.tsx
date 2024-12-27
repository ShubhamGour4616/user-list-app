interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-600 text-center">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Try Again
    </button>
  </div>
);
