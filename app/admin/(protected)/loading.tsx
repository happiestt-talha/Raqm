export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-border" />
      <div className="mt-8 flex flex-col gap-3">
        <div className="h-10 w-full bg-border/60" />
        <div className="h-10 w-full bg-border/60" />
        <div className="h-10 w-full bg-border/60" />
      </div>
    </div>
  );
}