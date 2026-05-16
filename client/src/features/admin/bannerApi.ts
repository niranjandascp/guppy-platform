import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Banner = {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
};

export type BannerPayload = {
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
};

export const getBanners = async (): Promise<Banner[]> => {
  const { data } = await api.get(ENDPOINTS.banners.all);
  return Array.isArray(data) ? data : data.banners || [];
};

export const createBanner = async (payload: BannerPayload) => {
  const { data } = await api.post(ENDPOINTS.banners.all, payload);
  return data;
};

export const updateBanner = async ({
  id,
  payload,
}: {
  id: string;
  payload: BannerPayload;
}) => {
  const { data } = await api.put(ENDPOINTS.banners.byId(id), payload);
  return data;
};

export const deleteBanner = async (id: string) => {
  const { data } = await api.delete(ENDPOINTS.banners.byId(id));
  return data;
};

export const getActiveBanners = async (): Promise<Banner[]> => {
  const { data } = await api.get(ENDPOINTS.banners.active);
  return Array.isArray(data) ? data : data.banners || [];
};