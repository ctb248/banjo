import { FC } from "react";
import PageButton, { PageTarget, PAGE_DIRECTION } from "./PageButton";

interface PaginationProps {
  currentPage: number;
  maxPages: number;
  handlePageChange: (target: PageTarget) => void;
  pageRange: number[];
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  maxPages,
  handlePageChange,
  pageRange,
}) => {
  return (
    <div className="table-pagination">
      <PageButton
        disabled={currentPage < 2}
        onClick={handlePageChange}
        pageTarget={PAGE_DIRECTION.DECREMENT}
      />
      {pageRange.map((page) => (
        <PageButton
          key={page}
          selected={currentPage === page}
          onClick={handlePageChange}
          pageTarget={page}
        />
      ))}
      <PageButton
        disabled={currentPage >= maxPages}
        onClick={handlePageChange}
        pageTarget={PAGE_DIRECTION.INCREMENT}
      />
    </div>
  );
};

export default Pagination;
