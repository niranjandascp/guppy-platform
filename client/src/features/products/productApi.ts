import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export const getFeaturedProducts = async () => {
  const { data } = await api.get(ENDPOINTS.products.featured);
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get(ENDPOINTS.products.all);
  return data;
};