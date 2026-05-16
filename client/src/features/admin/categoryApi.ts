import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
};

export type CategoryPayload = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get(ENDPOINTS.categories.all);
  return Array.isArray(data) ? data : data.categories || [];
};

export const createCategory = async (payload: CategoryPayload) => {
  const { data } = await api.post(ENDPOINTS.categories.all, payload);
  return data;
};

export const updateCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: CategoryPayload;
}) => {
  const { data } = await api.put(ENDPOINTS.categories.byId(id), payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(ENDPOINTS.categories.byId(id));
  return data;
};