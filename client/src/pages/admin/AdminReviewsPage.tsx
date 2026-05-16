import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteReview,
  getAdminReviews,
  updateReviewStatus,
} from "../../features/reviews/reviewApi";

export default function AdminReviewsPage() {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: getAdminReviews,
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
  };

  const statusMutation = useMutation({
    mutationFn: updateReviewStatus,
    onSuccess: () => {
      toast.success("Review status updated");
      refresh();
    },
    onError: () => toast.error("Failed to update review"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted");
      refresh();
    },
    onError: () => toast.error("Failed to delete review"),
  });

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Reviews</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Moderate reviews</h1>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10 text-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-slate-400">
                  Loading reviews...
                </td>
              </tr>
            ) : reviews.length ? (
              reviews.map((review) => (
                <tr key={review._id}>
                  <td className="px-4 py-4">{review.product?.title || "Product"}</td>
                  <td className="px-4 py-4">{review.user?.name || "User"}</td>
                  <td className="px-4 py-4">{review.rating}/5</td>
                  <td className="px-4 py-4 max-w-[280px] truncate">{review.comment}</td>
                  <td className="px-4 py-4">
                    <select
                      value={review.status || "pending"}
                      onChange={(e) =>
                        statusMutation.mutate({
                          id: review._id,
                          status: e.target.value as "pending" | "approved" | "rejected",
                        })
                      }
                      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
                    >
                      <option value="pending">pending</option>
                      <option value="approved">approved</option>
                      <option value="rejected">rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => deleteMutation.mutate(review._id)}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-slate-400">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}