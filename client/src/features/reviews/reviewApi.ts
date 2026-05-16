import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Review = {
  _id: string;
  user?: {
    _id: string;
    name: string;
  };
  product?: {
    _id: string;
    title: string;
  };
  rating: number;
  comment: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
};

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const { data } = await api.get(ENDPOINTS.reviews.byProduct(productId));
  return Array.isArray(data) ? data : data.reviews || [];
};

export const createReview = async (payload: {
  product: string;
  rating: number;
  comment: string;
}) => {
  const { data } = await api.post(ENDPOINTS.reviews.all, payload);
  return data;
};

export const getAdminReviews = async (): Promise<Review[]> => {
  const { data } = await api.get(ENDPOINTS.reviews.all);
  return Array.isArray(data) ? data : data.reviews || [];
};

export const updateReviewStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "pending" | "approved" | "rejected";
}) => {
  const { data } = await api.put(ENDPOINTS.reviews.status(id), { status });
  return data;
};

export const deleteReview = async (id: string) => {
  const { data } = await api.delete(ENDPOINTS.reviews.byId(id));
  return data;
};