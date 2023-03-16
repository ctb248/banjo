import { useState, useMemo, useEffect } from "react";
import { range } from "../../utils";
import { PageTarget, PAGE_DIRECTION } from "./PageButton";
import TableRow from "./Row";
import TablePagination from "./Pagination";
import "./Table.scss";

type ComputedColumn<T> = {
  renderKey: string;
  render: (record: T) => string | number | JSX.Element;
  title?: string;
  className?: string;
};

export type Column<T extends Record<string, any>> =
  | {
      [K in keyof T]: {
        key: K;
        title: string;
        render?: (value: T[K], record: T) => string | number | JSX.Element;
        className?: string;
      };
    }[keyof T]
  | ComputedColumn<T>;

interface TableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
}

const MAX_PAGE_BUTTONS = 5;

const Table = <T extends Record<string, any>>({
  columns,
  data,
  pageSize,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPages, setmaxPages] = useState<number>(1);

  const handlePageChange = (target: PageTarget) => {
    switch (target) {
      case PAGE_DIRECTION.INCREMENT:
        setCurrentPage(currentPage + 1);
        break;
      case PAGE_DIRECTION.DECREMENT:
        setCurrentPage(currentPage - 1);
        break;
      default:
        setCurrentPage(target);
    }
  };

  const getPageRange = () => {
    if (maxPages < MAX_PAGE_BUTTONS) return range(1, maxPages);
    const metaPage = Math.ceil(currentPage / MAX_PAGE_BUTTONS);
    const isLastPage = metaPage * MAX_PAGE_BUTTONS > maxPages;

    const end = isLastPage ? maxPages : metaPage * MAX_PAGE_BUTTONS;
    const start = isLastPage
      ? end - ((maxPages % MAX_PAGE_BUTTONS) - 1)
      : end - (MAX_PAGE_BUTTONS - 1);

    return range(start, end);
  };

  useEffect(() => {
    if (pageSize) {
      const newMaxPage = Math.ceil(data.length / pageSize) || 1;
      setmaxPages(newMaxPage);
      currentPage > newMaxPage && setCurrentPage(newMaxPage);
    }
  }, [data, pageSize, setmaxPages, currentPage]);

  const displayData = useMemo(
    () =>
      pageSize
        ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : data,
    [data, currentPage, pageSize]
  );

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row table-row--header">
            {columns.map((col) => (
              <th key={"key" in col ? col.key.toString() : col.renderKey}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {displayData.map((record) => (
            <TableRow record={record} columns={columns} key={record.number} />
          ))}
        </tbody>
      </table>
      <div className="table-bottom">
        {maxPages > 1 && (
          <>
            <div className="table-counter">
              {`Showing ${displayData.length} items out of ${data.length} items found`}
            </div>
            <TablePagination
              currentPage={currentPage}
              maxPages={maxPages}
              handlePageChange={handlePageChange}
              pageRange={getPageRange()}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
