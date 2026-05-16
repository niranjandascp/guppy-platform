import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../../features/reviews/reviewApi";

type Props = {
  productId: string;
};

export default function ReviewList({ productId }: Props) {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">Customer reviews</h3>

      <div className="mt-5 space-y-4">
        {isLoading ? (
          <p className="text-slate-400">Loading reviews...</p>
        ) : reviews.length ? (
          reviews
            .filter((review) => review.status !== "rejected")
            .map((review) => (
              <div
                key={review._id}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{review.user?.name || "User"}</p>
                  <p className="text-sm text-cyan-300">{review.rating}/5</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{review.comment}</p>
              </div>
            ))
        ) : (
          <p className="text-slate-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}