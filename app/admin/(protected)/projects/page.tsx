import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/admin/data-table";
import { deleteProject } from "@/lib/actions/projects";

export default async function ProjectsListPage() {
  const items = await db.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-display uppercase">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="label-mono border border-ink bg-ink px-4 py-2 text-paper hover:bg-accent hover:border-accent"
        >
          + Add project
        </Link>
      </div>

      <div className="mt-8">
        <DataTable
          items={items}
          emptyLabel="No projects yet — add your first one."
          editHref={(item) => `/admin/projects/${item.id}`}
          deleteAction={deleteProject}
          columns={[
            { header: "Title", render: (i) => i.title },
            { header: "Slug", render: (i) => i.slug },
            { header: "Featured", render: (i) => (i.featured ? "★" : "") }
          ]}
        />
      </div>
    </div>
  );
}