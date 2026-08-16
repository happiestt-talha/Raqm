import { Nav } from "@/components/public/nav";
import { Footer } from "@/components/public/footer";
import { ProjectCard } from "@/components/public/project-card";
import { getProjects } from "@/lib/data";

export const revalidate = 3600;

export const metadata = {
  title: "Work — M Talha Manzoor",
  description: "Selected projects and builds by M Talha Manzoor."
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main className="section-px section-py">
        <div className="flex items-start gap-4">
          <span className="text-section-num font-display text-accent">01</span>
          <div>
            <h1 className="text-h2 font-display uppercase">All work</h1>
            <p className="mt-2 max-w-xs text-sm text-ink/70">
              Every project worth showing, in one place.
            </p>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-border p-10 text-center">
            <p className="text-sm text-ink/60">No projects published yet.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}