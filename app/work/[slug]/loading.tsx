import { Nav } from "@/components/public/nav";
import { Footer } from "@/components/public/footer";

export default function ProjectLoading() {
  return (
    <>
      <Nav />
      <main className="section-px section-py animate-pulse">
        <div className="h-4 w-20 bg-ink/10" />

        <div className="mt-6 h-12 w-3/4 max-w-xl bg-ink/15" />
        <div className="mt-4 h-6 w-1/2 max-w-lg bg-ink/10" />

        <div className="mt-6 flex gap-2">
          <div className="h-6 w-16 bg-ink/10" />
          <div className="h-6 w-20 bg-ink/10" />
          <div className="h-6 w-24 bg-ink/10" />
        </div>

        <div className="relative mt-10 aspect-video w-full border border-border bg-ink/10" />

        <div className="mt-10 flex flex-col gap-4 max-w-2xl">
          <div className="h-4 w-full bg-ink/10" />
          <div className="h-4 w-5/6 bg-ink/10" />
          <div className="h-4 w-4/6 bg-ink/10" />
        </div>
      </main>
      <Footer />
    </>
  );
}
