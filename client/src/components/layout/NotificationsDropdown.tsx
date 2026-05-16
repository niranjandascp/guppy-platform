import { Bell } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationRead } from "../../features/notifications/notificationApi";
import { useState } from "react";

export default function NotificationsDropdown() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const mutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-cyan-300"
      >
        <Bell size={18} />
        {unreadCount > 0 ? (
          <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-3 w-[340px] rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            <span className="text-xs text-slate-400">{unreadCount} unread</span>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto">
            {notifications.length ? (
              notifications.map((item) => (
                <button
                  key={item._id}
                  onClick={() => !item.isRead && mutation.mutate(item._id)}
                  className={`w-full rounded-xl border p-4 text-left ${
                    item.isRead
                      ? "border-white/10 bg-white/5"
                      : "border-cyan-400/20 bg-cyan-400/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-300">{item.message}</p>
                </button>
              ))
            ) : (
              <p className="text-sm text-slate-400">No notifications yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}