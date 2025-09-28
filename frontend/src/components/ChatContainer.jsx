import { useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const { selectedUser, messages, isMessagesLoading } = useChatStore();
  const messageEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex h-full w-full items-center justify-center text-base-content/50">
        Select a chat to start messaging
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col h-full w-full bg-base-200">
        <ChatHeader />
        <div className="flex-1 p-4 overflow-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full w-full bg-base-200">
      <ChatHeader />
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          return (
            <div
              key={message._id + "-" + index}
              className={`flex items-center ${
                isSender ? "justify-end" : "justify-start"
              }`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              {!isSender && (
                <div className="avatar mr-2">
                  <div className="w-7 h-7 rounded-full border overflow-hidden">
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt={selectedUser.fullName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}

              <div
                className={`flex items-end gap-2 max-w-xs sm:max-w-sm break-words p-2 rounded-lg shadow-2xl ${
                  isSender
                    ? "bg-blue-800 text-primary-content rounded-tr-none"
                    : "bg-base-100 text-base-content rounded-tl-none"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="rounded-md mb-2 sm:max-w-[200px] max-w-full"
                  />
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
                <time className="text-[10px] text-gray-100 opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {isSender && (
                <div className="avatar ml-2">
                  <div className="w-7 h-7 rounded-full border overflow-hidden">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt={authUser.fullName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
