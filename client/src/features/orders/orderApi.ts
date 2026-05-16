import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type ShippingAddress = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CreateOrderPayload = {
  products: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  address: ShippingAddress;
  paymentMethod: string;
};

export type Order = {
  _id: string;
  products: Array<{
    product: {
      _id: string;
      title: string;
      images?: string[];
    };
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  paymentStatus: string;
  shippingStatus: string;
  createdAt: string;
  address: ShippingAddress;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const { data } = await api.post(ENDPOINTS.orders.all, payload);
  return data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const { data } = await api.get(ENDPOINTS.orders.mine);
  return Array.isArray(data) ? data : data.orders || [];
};

export const getAdminOrders = async (): Promise<Order[]> => {
  const { data } = await api.get(ENDPOINTS.orders.all);
  return Array.isArray(data) ? data : data.orders || [];
};

export const updateOrderStatus = async ({
  id,
  paymentStatus,
  shippingStatus,
}: {
  id: string;
  paymentStatus?: string;
  shippingStatus?: string;
}) => {
  const { data } = await api.put(`${ENDPOINTS.orders.all}/${id}`, {
    paymentStatus,
    shippingStatus,
  });
  return data;
};