import Image from "next/image";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  coverImage: string | null;
  tags: string[];
};

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border border-border bg-ink text-paper"
    >
      <div className="flex items-center justify-between border-b border-paper/20 px-6 py-3">
        <span className="label-mono bg-accent px-2 py-1 text-paper">Featured project</span>
        <span className="label-mono text-paper/60 transition-colors group-hover:text-accent">
          View project ↗
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_1.2fr] md:gap-10 md:p-10">
        <div className="flex flex-col justify-center">
          <h3 className="text-h2 font-display uppercase">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="label-mono border border-paper/25 px-2 py-1 text-paper/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Fixed aspect-ratio box — image never causes layout shift regardless of load timing */}
        <div className="relative aspect-video w-full overflow-hidden bg-paper/5">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="label-mono text-paper/40">Preview coming soon</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block border border-border bg-paper">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="label-mono text-muted">No preview</span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="text-h3 font-display uppercase">{project.title}</h3>
          <p className="mt-1 text-sm text-ink/70">{project.tagline}</p>
        </div>
        <span
          className="label-mono mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
          aria-hidden
        >
          ↗
        </span>
      </div>
    </Link>
  );
}