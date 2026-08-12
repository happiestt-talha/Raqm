import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { createExperience } from "@/lib/actions/experience";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Add experience</h1>
      <div className="mt-8">
        <ExperienceForm action={createExperience} />
      </div>
    </div>
  );
}