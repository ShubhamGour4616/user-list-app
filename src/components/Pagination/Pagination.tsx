import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  canPrevPage: boolean;
  canNextPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  canPrevPage,
  canNextPage,
  onPrevPage,
  onNextPage,
}) => (
  <div className="flex items-center gap-4 py-4">
    <PaginationButton onClick={onPrevPage} disabled={!canPrevPage}>
      Previous
    </PaginationButton>
    <span className="text-gray-700">
      Page {currentPage} of {totalPages}
    </span>
    <PaginationButton onClick={onNextPage} disabled={!canNextPage}>
      Next
    </PaginationButton>
  </div>
);
