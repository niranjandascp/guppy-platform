export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  users: {
    profile: "/users/profile",
  },
  products: {
    all: "/products",
    featured: "/products/featured",
    bySlug: (slug: string) => `/products/${slug}`,
  },
  orders: {
    all: "/orders",
    mine: "/orders/my-orders",
  },
};