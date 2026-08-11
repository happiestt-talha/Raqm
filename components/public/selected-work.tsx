import { FeaturedProjectCard, ProjectCard } from "./project-card";

type Project = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  coverImage: string | null;
  tags: string[];
  featured: boolean;
};

export function SelectedWork({ projects }: { projects: Project[] }) {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured).slice(0, 4);

  return (
    <section id="work" className="section-px section-py border-t border-border">
      <div className="flex items-start gap-4">
        <span className="text-section-num font-display text-accent">01</span>
        <div>
          <h2 className="text-h2 font-display uppercase">Selected work</h2>
          <p className="mt-2 max-w-xs text-sm text-ink/70">
            A few projects that reflect my approach to building useful products.
          </p>
        </div>
      </div>

      {featured && (
        <div className="mt-10">
          <FeaturedProjectCard project={featured} />
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}