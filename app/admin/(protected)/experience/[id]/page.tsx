import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { updateExperience } from "@/lib/actions/experience";

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const experience = await db.experience.findUnique({ where: { id: params.id } });
  if (!experience) notFound();

  const boundUpdate = updateExperience.bind(null, experience.id);

  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Edit experience</h1>
      <div className="mt-8">
        <ExperienceForm action={boundUpdate} defaultValues={experience} />
      </div>
    </div>
  );
}