import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/admin/data-table";
import { deleteCertification } from "@/lib/actions/certifications";

export default async function CertificationsListPage() {
  const items = await db.certification.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-display uppercase">Certifications</h1>
        <Link
          href="/admin/certifications/new"
          className="label-mono border border-ink bg-ink px-4 py-2 text-paper hover:bg-accent hover:border-accent"
        >
          + Add certification
        </Link>
      </div>

      <div className="mt-8">
        <DataTable
          items={items}
          emptyLabel="No certifications yet — add your first one."
          editHref={(item) => `/admin/certifications/${item.id}`}
          deleteAction={deleteCertification}
          columns={[
            { header: "Title", render: (i) => i.title },
            { header: "Issuer", render: (i) => i.issuer },
            { header: "Issued", render: (i) => new Date(i.issueDate).getFullYear() }
          ]}
        />
      </div>
    </div>
  );
}