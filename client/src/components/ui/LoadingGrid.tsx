export default function LoadingGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
        >
          <div className="aspect-[4/3] rounded-[1.25rem] bg-slate-800" />
          <div className="mt-4 h-4 w-24 rounded bg-slate-700" />
          <div className="mt-3 h-6 w-2/3 rounded bg-slate-700" />
          <div className="mt-3 h-4 w-1/2 rounded bg-slate-800" />
          <div className="mt-5 h-11 rounded-full bg-slate-700" />
        </div>
      ))}
    </div>
  );
}