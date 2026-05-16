const guides = [
  {
    id: 1,
    category: "Care Guide",
    title: "How to choose the right guppy for beginners",
    description:
      "A simple starter guide to understanding temperament, tank setup, and entry-level premium lines.",
  },
  {
    id: 2,
    category: "Aquarium Tips",
    title: "Tank compatibility basics for premium guppies",
    description:
      "Learn what to check before mixing fish types, planning size, and avoiding common compatibility mistakes.",
  },
  {
    id: 3,
    category: "Maintenance",
    title: "What healthy stock information should look like",
    description:
      "Understand key signals like lineage details, stock quality, and care transparency before buying.",
  },
];

export default function CareGuidePreview() {
  return (
    <section className="mt-16 md:mt-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Care Guide</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Educational content that builds trust
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-7 text-slate-400">
          A care guide or blog preview helps your storefront feel more credible and improves long-term SEO structure.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <article
            key={guide.id}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{guide.category}</p>
            <h3 className="mt-4 text-xl font-semibold text-white">{guide.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">{guide.description}</p>
            <button className="mt-6 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:text-cyan-300">
              Read Preview
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}