import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  blockUser,
  getAdminUsers,
  unblockUser,
  updateUserRole,
} from "../../features/admin/adminApi";

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const queryParams = useMemo(
    () => ({
      search,
      role,
      page: 1,
      limit: 20,
    }),
    [search, role]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", queryParams],
    queryFn: () => getAdminUsers(queryParams),
  });

  const refreshUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-users"] });
  };

  const blockMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      toast.success("User blocked");
      refreshUsers();
    },
    onError: () => toast.error("Failed to block user"),
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      toast.success("User unblocked");
      refreshUsers();
    },
    onError: () => toast.error("Failed to unblock user"),
  });

  const roleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success("Role updated");
      refreshUsers();
    },
    onError: () => toast.error("Failed to update role"),
  });

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
        Users
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Manage users</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_180px]">
        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none placeholder:text-white/40"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="h-12 rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none"
        >
          <option value="all">All roles</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10 text-slate-200">
            {isLoading ? (
              <tr>
                <td className="px-4 py-6 text-slate-400" colSpan={5}>
                  Loading users...
                </td>
              </tr>
            ) : data?.users?.length ? (
              data.users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        roleMutation.mutate({
                          id: user._id,
                          role: e.target.value as "customer" | "admin",
                        })
                      }
                      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
                    >
                      <option value="customer">customer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    {user.isBlocked ? (
                      <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-300">
                        Blocked
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {user.isBlocked ? (
                      <button
                        onClick={() => unblockMutation.mutate(user._id)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-cyan-300 hover:bg-white/5"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => blockMutation.mutate(user._id)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300 hover:bg-white/5"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-slate-400" colSpan={5}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}