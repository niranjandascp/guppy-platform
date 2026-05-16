import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  isBlocked?: boolean;
  phone?: string;
  createdAt?: string;
};

export type AdminUsersResponse = {
  users: AdminUser[];
  total: number;
  page: number;
  pages: number;
};

export const getAdminUsers = async (params?: {
  search?: string;
  role?: string;
  isBlocked?: string;
  page?: number;
  limit?: number;
}): Promise<AdminUsersResponse> => {
  const { data } = await api.get(ENDPOINTS.users.all, { params });
  return data;
};

export const blockUser = async (id: string) => {
  const { data } = await api.put(`${ENDPOINTS.users.all}/${id}/block`);
  return data;
};

export const unblockUser = async (id: string) => {
  const { data } = await api.put(`${ENDPOINTS.users.all}/${id}/unblock`);
  return data;
};

export const updateUserRole = async ({
  id,
  role,
}: {
  id: string;
  role: "customer" | "admin";
}) => {
  const { data } = await api.put(`${ENDPOINTS.users.all}/${id}/role`, { role });
  return data;
};