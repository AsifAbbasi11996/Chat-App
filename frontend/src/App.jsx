import React, { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import Navbar from "./components/Navbar";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import UserRoutes from "./routes/UserRoutes";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      {/* Navbar visible only when logged in */}
      {authUser && <Navbar />}

      {/* App routes */}
      <UserRoutes />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default App;
