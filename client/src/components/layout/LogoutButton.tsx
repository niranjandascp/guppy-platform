import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { logoutUser } from "../../features/auth/authApi";
import { useAuthStore } from "../../features/auth/authStore";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success("Logged out successfully");
    },
    onError: () => {
      clearAuth();
      queryClient.clear();
      toast.success("Logged out locally");
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:text-cyan-300"
    >
      <LogOut size={16} />
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}