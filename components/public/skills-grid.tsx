type SkillsByCategory = Record<string, { id: string; name: string }[]>;

const categoryOrder = ["Languages", "Frontend", "Backend", "Database", "Auth & Cloud", "Tools"];

export function SkillsGrid({ skills }: { skills: SkillsByCategory }) {
  const categories = categoryOrder.filter((cat) => skills[cat]?.length);

  return (
    <section id="stack" className="section-px section-py border-t border-border">
      <div className="flex items-start gap-4">
        <span className="text-section-num font-display text-accent">03</span>
        <div>
          <h2 className="text-h2 font-display uppercase">The stack</h2>
          <p className="mt-2 max-w-xs text-sm text-ink/70">
            Technologies and tools I reach for to ship production-grade work.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category} className="bg-paper p-6">
            <p className="label-mono text-accent">{category}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {skills[category].map((skill) => (
                <li key={skill.id} className="text-sm text-ink/80">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}