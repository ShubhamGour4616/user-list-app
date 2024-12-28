export const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner" data-testid="loading-spinner"></div>{" "}
    <p className="loading-text">Loading users...</p>
  </div>
);
