import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Online indicator */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-base-100 ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-base">{selectedUser.fullName}</h3>
            <p className="text-xs text-base-content/60">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right: Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-base-200 transition"
        >
          <X className="w-5 h-5 text-base-content/70" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
