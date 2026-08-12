import Link from "next/link";
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [experienceCount, projectCount, skillCount, certCount] = await Promise.all([
    db.experience.count(),
    db.project.count(),
    db.skill.count(),
    db.certification.count()
  ]);

  const cards = [
    { label: "Experience", count: experienceCount, href: "/admin/experience" },
    { label: "Projects", count: projectCount, href: "/admin/projects" },
    { label: "Skills", count: skillCount, href: "/admin/skills" },
    { label: "Certifications", count: certCount, href: "/admin/certifications" }
  ];

  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Dashboard</h1>
      <p className="mt-2 text-sm text-ink/60">Manage everything on your portfolio from here.</p>

      <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-paper p-6 hover:bg-ink/5">
            <p className="label-mono text-muted">{card.label}</p>
            <p className="mt-2 font-display text-4xl">{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}