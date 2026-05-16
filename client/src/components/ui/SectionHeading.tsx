type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}