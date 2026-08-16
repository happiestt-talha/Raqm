type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  credentialUrl: string | null;
};

export function Certifications({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-px section-py border-t border-border">
      <p className="label-mono text-accent">Certifications</p>
      <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
        {items.map((cert) => (
          <div key={cert.id} className="flex items-center justify-between gap-4 bg-paper p-5">
            <div>
              <p className="text-sm font-medium">{cert.title}</p>
              <p className="label-mono mt-1 text-muted">
                {cert.issuer} · {new Date(cert.issueDate).getFullYear()}
              </p>
            </div>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono shrink-0 text-ink/60 hover:text-accent"
              >
                View ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}