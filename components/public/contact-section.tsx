import { ContactForm } from "./contact-form";

type ContactProps = {
  email: string;
  phone?: string | null;
  location: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
};

export function ContactSection(props: ContactProps) {
  const socials = [
    { label: "GitHub", url: props.githubUrl },
    { label: "LinkedIn", url: props.linkedinUrl },
    { label: "Twitter", url: props.twitterUrl },
    { label: "Instagram", url: props.instagramUrl }
  ].filter((s) => s.url);

  return (
    <section id="contact" className="section-px section-py border-t border-border">
      <div className="flex items-start gap-4">
        <span className="text-section-num font-display text-accent">05</span>
        <div>
          <h2 className="text-h2 font-display uppercase">Let&apos;s build something</h2>
          <p className="mt-2 max-w-xs text-sm text-ink/70">
            Have a project in mind? Let&apos;s create something worth shipping.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <dl className="flex flex-col gap-5 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <dt className="label-mono text-muted">Email</dt>
            <dd className="mt-1 text-sm">{props.email}</dd>
          </div>
          {props.phone && (
            <div>
              <dt className="label-mono text-muted">Phone</dt>
              <dd className="mt-1 text-sm">{props.phone}</dd>
            </div>
          )}
          <div>
            <dt className="label-mono text-muted">Location</dt>
            <dd className="mt-1 text-sm">{props.location}</dd>
          </div>
          {socials.length > 0 && (
            <div>
              <dt className="label-mono text-muted">Socials</dt>
              <dd className="mt-2 flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-ink/70 hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}