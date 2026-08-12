import Link from "next/link";

type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T extends { id: string }> = {
  items: T[];
  columns: Column<T>[];
  editHref: (item: T) => string;
  deleteAction: (id: string) => Promise<void>;
  emptyLabel: string;
};

export function DataTable<T extends { id: string }>({
  items,
  columns,
  editHref,
  deleteAction,
  emptyLabel
}: DataTableProps<T>) {
  if (items.length === 0) {
    return (
      <div className="border border-dashed border-border p-10 text-center">
        <p className="text-sm text-ink/60">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left">
          {columns.map((col) => (
            <th key={col.header} className="label-mono pb-3 pr-4 font-normal text-muted">
              {col.header}
            </th>
          ))}
          <th className="pb-3" />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-border">
            {columns.map((col) => (
              <td key={col.header} className="py-3 pr-4">{col.render(item)}</td>
            ))}
            <td className="py-3 text-right">
              <div className="flex justify-end gap-4">
                <Link href={editHref(item)} className="label-mono text-ink/60 hover:text-ink">
                  Edit
                </Link>
                <form action={deleteAction.bind(null, item.id)}>
                  <button type="submit" className="label-mono text-accent hover:opacity-70">
                    Delete
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}