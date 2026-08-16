import { Nav } from "@/components/public/nav";
import { Footer } from "@/components/public/footer";

export default function WorkLoading() {
  return (
    <>
      <Nav />
      <main className="section-px section-py animate-pulse">
        <div className="flex items-start gap-4">
          <span className="text-section-num font-display text-accent/50">01</span>
          <div>
            <div className="h-8 w-40 bg-ink/15" />
            <div className="mt-2 h-4 w-60 bg-ink/10" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-border bg-paper p-4">
              <div className="aspect-[4/3] w-full bg-ink/10" />
              <div className="mt-4 h-5 w-1/2 bg-ink/15" />
              <div className="mt-2 h-4 w-3/4 bg-ink/10" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
