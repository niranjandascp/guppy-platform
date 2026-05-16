import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Notification = {
  _id: string;
  title: string;
  message: string;
  type?: "order" | "stock" | "system";
  isRead: boolean;
  createdAt?: string;
};

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get(ENDPOINTS.notifications.all);
  return Array.isArray(data) ? data : data.notifications || [];
};

export const markNotificationRead = async (id: string) => {
  const { data } = await api.patch(ENDPOINTS.notifications.markRead(id));
  return data;
};