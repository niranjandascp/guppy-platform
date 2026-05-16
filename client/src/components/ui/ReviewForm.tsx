import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "./Button";
import { createReview } from "../../features/reviews/reviewApi";

type Props = {
  productId: string;
};

export default function ReviewForm({ productId }: Props) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review submitted");
      setComment("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["product-reviews", productId] });
    },
    onError: () => {
      toast.error("Failed to submit review");
    },
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">Write a review</h3>

      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-300">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none"
        >
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-300">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
          placeholder="Share your experience..."
        />
      </div>

      <Button
        className="mt-5"
        onClick={() => mutation.mutate({ product: productId, rating, comment })}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}