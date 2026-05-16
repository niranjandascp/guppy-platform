import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type Address = {
  _id?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type ProfileUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  addresses?: Address[];
};

export const getProfile = async (): Promise<ProfileUser> => {
  const { data } = await api.get(ENDPOINTS.users.profile);
  return data;
};

export const updateProfile = async (payload: {
  name: string;
  email: string;
}) => {
  const { data } = await api.put(ENDPOINTS.users.profile, payload);
  return data;
};

export const addAddress = async (payload: Address) => {
  const { data } = await api.post(ENDPOINTS.users.addresses, payload);
  return data;
};

export const deleteAddress = async (id: string) => {
  const { data } = await api.delete(`${ENDPOINTS.users.addresses}/${id}`);
  return data;
};