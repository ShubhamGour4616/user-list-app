interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="try-again-button"
    >
      Try Again
    </button>
  </div>
);
