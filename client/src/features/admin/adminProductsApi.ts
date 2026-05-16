import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type AdminProduct = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  breed?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  featured?: boolean;
  genetics?: string;
  tankSize?: string;
  lifespan?: string;
  images?: string[];
};

export type ProductPayload = {
  title: string;
  slug: string;
  description: string;
  category: string;
  breed?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  featured?: boolean;
  genetics?: string;
  tankSize?: string;
  lifespan?: string;
  images?: string[];
};

export const getAdminProducts = async (): Promise<AdminProduct[]> => {
  const { data } = await api.get(ENDPOINTS.products.all);
  return Array.isArray(data) ? data : data.products || [];
};

export const createProduct = async (payload: ProductPayload) => {
  const { data } = await api.post(ENDPOINTS.products.all, payload);
  return data;
};

export const updateProduct = async ({
  id,
  payload,
}: {
  id: string;
  payload: ProductPayload;
}) => {
  const { data } = await api.put(ENDPOINTS.products.byId(id), payload);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(ENDPOINTS.products.byId(id));
  return data;
};