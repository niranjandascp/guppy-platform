import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./authApi";
import { useAuthStore } from "./authStore";

export function useRestoreSession() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setHydrated = useAuthStore((state) => state.setHydrated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { data, isSuccess, isError, isFetched } = useQuery({
    queryKey: ["auth-me"],
    queryFn: getCurrentUser,
    enabled: !!accessToken,
    retry: false,
  });

  useEffect(() => {
    if (!accessToken) {
      setHydrated(true);
      return;
    }

    if (isSuccess && data) {
      setUser(data);
      setHydrated(true);
    }

    if (isError && isFetched) {
      clearAuth();
    }
  }, [accessToken, data, isSuccess, isError, isFetched, setUser, setHydrated, clearAuth]);
}