import type { Column } from "./Table";

interface RowProps<T extends Record<string, any>> {
  record: T;
  columns: Column<T>[];
}

const Row = <T extends Record<string, any>>({
  record,
  columns,
}: RowProps<T>) => {
  const getColumnValue = (col: Column<T>): any => {
    if ("key" in col) {
      return "render" in col
        ? col.render?.(record[col.key], record)
        : record[col.key];
    }
    return col.render(record);
  };

  return (
    <tr className="table-row">
      {columns.map((col) => {
        return (
          <td
            key={"key" in col ? col.key.toString() : col.renderKey}
            className={`table-cell ${col.className ? col.className : ""}`}
          >
            {getColumnValue(col)}
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
