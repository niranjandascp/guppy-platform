import { api } from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

export type AnalyticsResponse = {
  summary: {
    revenue: number;
    orders: number;
    users: number;
    products: number;
  };
  revenueChart: Array<{
    name: string;
    revenue: number;
  }>;
  ordersChart: Array<{
    name: string;
    orders: number;
  }>;
  topProducts: Array<{
    title: string;
    sales: number;
  }>;
};

export const getDashboardAnalytics = async (): Promise<AnalyticsResponse> => {
  const { data } = await api.get(ENDPOINTS.analytics.dashboard);
  return data;
};
