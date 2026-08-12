import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/admin/data-table";
import { deleteExperience } from "@/lib/actions/experience";

export default async function ExperienceListPage() {
  const items = await db.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-display uppercase">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="label-mono border border-ink bg-ink px-4 py-2 text-paper hover:bg-accent hover:border-accent"
        >
          + Add experience
        </Link>
      </div>

      <div className="mt-8">
        <DataTable
          items={items}
          emptyLabel="No experience entries yet — add your first one."
          editHref={(item) => `/admin/experience/${item.id}`}
          deleteAction={deleteExperience}
          columns={[
            { header: "Company", render: (i) => i.company },
            { header: "Role", render: (i) => i.role },
            {
              header: "Dates",
              render: (i) =>
                `${new Date(i.startDate).getFullYear()} — ${i.endDate ? new Date(i.endDate).getFullYear() : "Present"}`
            }
          ]}
        />
      </div>
    </div>
  );
}