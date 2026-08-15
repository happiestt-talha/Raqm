import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "@/components/admin/data-table";
import { deleteSkill } from "@/lib/actions/skills";

export default async function SkillsListPage() {
  const items = await db.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-display uppercase">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="label-mono border border-ink bg-ink px-4 py-2 text-paper hover:bg-accent hover:border-accent"
        >
          + Add skill
        </Link>
      </div>

      <div className="mt-8">
        <DataTable
          items={items}
          emptyLabel="No skills yet — add your first one."
          editHref={(item) => `/admin/skills/${item.id}`}
          deleteAction={deleteSkill}
          columns={[
            { header: "Name", render: (i) => i.name },
            { header: "Category", render: (i) => i.category }
          ]}
        />
      </div>
    </div>
  );
}