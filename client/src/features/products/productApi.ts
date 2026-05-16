import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  breed?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images?: string[];
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
  genetics?: string;
  tankSize?: string;
  lifespan?: string;
  tags?: string[];
};

export type ProductQueryParams = {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  pages: number;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data } = await api.get(ENDPOINTS.products.featured);
  return Array.isArray(data) ? data : data.products || [];
};

export const getProducts = async (
  params?: ProductQueryParams
): Promise<ProductsResponse> => {
  const { data } = await api.get(ENDPOINTS.products.all, { params });

  if (Array.isArray(data)) {
    return {
      products: data,
      total: data.length,
      page: 1,
      pages: 1,
    };
  }

  return {
    products: data.products || [],
    total: data.total || 0,
    page: data.page || 1,
    pages: data.pages || 1,
  };
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const { data } = await api.get(ENDPOINTS.products.bySlug(slug));
  return data;
};