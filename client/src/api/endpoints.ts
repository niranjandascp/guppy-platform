export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  users: {
    profile: "/users/profile",
    all: "/users",
    stats: "/users/stats",
    addresses: "/users/addresses",
  },
  products: {
    all: "/products",
    featured: "/products/featured",
    bySlug: (slug: string) => `/products/${slug}`,
    byId: (id: string) => `/products/${id}`,
  },
  orders: {
    all: "/orders",
    mine: "/orders/my-orders",
  },
  coupons: {
    all: "/coupons",
    byId: (id: string) => `/coupons/${id}`,
  },
  banners: {
    all: "/banners",
    byId: (id: string) => `/banners/${id}`,
  },
  reviews: {
    all: "/reviews",
    byProduct: (productId: string) => `/reviews/product/${productId}`,
    byId: (id: string) => `/reviews/${id}`,
    status: (id: string) => `/reviews/${id}/status`,
  },
  analytics: {
    dashboard: "/analytics/dashboard",
  },
};