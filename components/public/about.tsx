import Image from "next/image";

type AboutProps = {
  bio: string;
  location: string;
  email: string;
  availability: string;
};

export function About({ bio, location, email, availability }: AboutProps) {
  return (
    <section id="about" className="section-px section-py border-t border-border">
      <div className="flex items-start gap-4">
        <span className="text-section-num font-display text-accent">04</span>
        <h2 className="text-h2 font-display uppercase">About me</h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr_auto]">
        <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-border bg-ink/5">
          <Image
            src="/images/talha-portrait.jpg"
            alt="M Talha Manzoor"
            fill
            sizes="(min-width: 1024px) 280px, 60vw"
            className="object-cover grayscale"
          />
        </div>

        <div className="max-w-xl">
          {bio.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4 text-base leading-relaxed text-ink/80 last:mb-0">
              {para}
            </p>
          ))}
          <p className="mt-8 font-display text-2xl">Talha</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start lg:grid-cols-1">
          <div>
            <dt className="label-mono text-muted">Location</dt>
            <dd className="mt-1 text-sm">{location}</dd>
          </div>
          <div>
            <dt className="label-mono text-muted">Email</dt>
            <dd className="mt-1 text-sm">{email}</dd>
          </div>
          <div>
            <dt className="label-mono text-muted">Availability</dt>
            <dd className="mt-1 text-sm">{availability}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
