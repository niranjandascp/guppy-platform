import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCategories } from "../../features/admin/categoryApi";

export default function CategoryStrip() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (!categories.length) return null;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap gap-3">
        {categories
          .filter((category) => category.isActive)
          .map((category) => (
            <Link
              key={category._id}
              to={`/shop?category=${category.slug}`}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              {category.name}
            </Link>
          ))}
      </div>
    </section>
  );
}