import React from "react";
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SettingsPage from "../pages/SettingsPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import { useAuthStore } from "../store/useAuthStore";

// ✅ PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? children : <Navigate to="/login" replace />;
};

const UserRoutes = () => {
  const { authUser } = useAuthStore();

  return (
    <ReactRoutes>
      {/* Public routes */}
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />

      {/* Protected routes */}
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} replace />} />
    </ReactRoutes>
  );
};

export default UserRoutes;
