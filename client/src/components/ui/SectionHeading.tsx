type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-gradient">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg leading-relaxed text-slate-400 font-light">
          {description}
        </p>
      )}
    </div>
  );
}