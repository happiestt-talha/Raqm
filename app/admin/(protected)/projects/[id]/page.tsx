import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { updateProject } from "@/lib/actions/projects";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await db.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Edit project</h1>
      <div className="mt-8">
        <ProjectForm action={boundUpdate} defaultValues={project} />
      </div>
    </div>
  );
}