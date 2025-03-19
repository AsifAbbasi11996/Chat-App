import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex flex-col border-r border-base-300 w-[400px] lg:w-72 h-full transition-all duration-200">
      <div className="p-5 border-b border-base-300 w-full">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="lg:block font-medium">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="lg:flex items-center gap-2 mt-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-zinc-500 text-xs">
            ({(onlineUsers.length || 0) - 1} online)
          </span>
        </div>
      </div>

      <div className="py-3 w-full overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="rounded-[50%] w-1/4 object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="right-0 bottom-0 absolute bg-green-500 rounded-full ring-2 ring-zinc-900 size-3" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block min-w-0 text-left">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-zinc-400 text-sm">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="py-4 text-zinc-500 text-center">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
