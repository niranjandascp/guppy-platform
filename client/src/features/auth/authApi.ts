import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post(ENDPOINTS.auth.login, payload);
  return data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post(ENDPOINTS.auth.register, payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get(ENDPOINTS.auth.me);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post(ENDPOINTS.auth.logout);
  return data;
};