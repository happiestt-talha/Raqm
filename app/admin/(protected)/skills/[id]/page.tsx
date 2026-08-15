import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { SkillForm } from "@/components/admin/forms/skill-form";
import { updateSkill } from "@/lib/actions/skills";

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const skill = await db.skill.findUnique({ where: { id: params.id } });
  if (!skill) notFound();

  const boundUpdate = updateSkill.bind(null, skill.id);

  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Edit skill</h1>
      <div className="mt-8">
        <SkillForm action={boundUpdate} defaultValues={skill} />
      </div>
    </div>
  );
}