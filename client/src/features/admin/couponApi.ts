import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Coupon = {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  expiresAt?: string;
  isActive: boolean;
};

export type CouponPayload = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  expiresAt?: string;
  isActive: boolean;
};

export const getCoupons = async (): Promise<Coupon[]> => {
  const { data } = await api.get(ENDPOINTS.coupons.all);
  return Array.isArray(data) ? data : data.coupons || [];
};

export const createCoupon = async (payload: CouponPayload) => {
  const { data } = await api.post(ENDPOINTS.coupons.all, payload);
  return data;
};

export const updateCoupon = async ({
  id,
  payload,
}: {
  id: string;
  payload: CouponPayload;
}) => {
  const { data } = await api.put(ENDPOINTS.coupons.byId(id), payload);
  return data;
};

export const deleteCoupon = async (id: string) => {
  const { data } = await api.delete(ENDPOINTS.coupons.byId(id));
  return data;
};

export const validateCoupon = async (code: string, subtotal: number) => {
  const { data } = await api.post(ENDPOINTS.coupons.validate, { code, subtotal });
  return data;
};