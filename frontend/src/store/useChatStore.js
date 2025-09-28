import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  _messageHandler: null, // store the socket listener

  // Fetch all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      if (Array.isArray(res.data)) set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      if (Array.isArray(res.data)) set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });

      // Emit socket event
      const socket = useAuthStore.getState().socket;
      socket?.emit("sendMessage", res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  // Subscribe to incoming messages
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser, _messageHandler } = get();
    if (!socket || !selectedUser) return;

    // Remove old listener
    if (_messageHandler) socket.off("newMessage", _messageHandler);

    const handler = (newMessage) => {
      // Only add messages relevant to current chat
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        set({ messages: [...get().messages, newMessage] });
      }
    };

    socket.on("newMessage", handler);
    set({ _messageHandler: handler }); // save handler for cleanup
  },

  // Unsubscribe
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    const handler = get()._messageHandler;
    if (socket && handler) {
      socket.off("newMessage", handler);
      set({ _messageHandler: null });
    }
  },

  // Set selected user
  setSelectedUser: (user) => {
    const prevUser = get().selectedUser;
    if (prevUser?._id !== user?._id) get().unsubscribeFromMessages();

    set({ selectedUser: user, messages: [] });

    if (user) {
      get().getMessages(user._id);
      get().subscribeToMessages();
    }
  },
}));
