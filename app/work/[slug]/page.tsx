import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/public/nav";
import { Footer } from "@/components/public/footer";
import { getProjectBySlug, getProjects } from "@/lib/data";

export const revalidate = 3600;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — M Talha Manzoor`,
    description: project.tagline
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="section-px section-py">
        <Link href="/work" className="label-mono text-muted hover:text-accent">
          ← All work
        </Link>

        <h1 className="text-hero mt-6 font-display uppercase">{project.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-ink/70">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="label-mono border border-border px-2 py-1 text-ink/70">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono border-b border-accent pb-0.5 text-accent hover:opacity-70"
            >
              View live ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono border-b border-ink pb-0.5 hover:text-accent hover:border-accent"
            >
              View repo ↗
            </a>
          )}
        </div>

        {project.coverImage && (
          <div className="relative mt-10 aspect-video w-full overflow-hidden border border-border bg-ink/5">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10 max-w-2xl">
          {project.description.split("\n\n").map((para: string, i: number) => (
            <p key={i} className="mb-4 text-base leading-relaxed text-ink/80 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}