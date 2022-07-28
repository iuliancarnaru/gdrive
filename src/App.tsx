import { ReactElement } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Profile } from "./components/authentication/Profile";
import { Login } from "./components/authentication/Login";
import { SignUp } from "./components/authentication/Signup";
import { Dashboard } from "./components/drive/Dashboard";
import { useAuth } from "./contexts/authContext";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactElement;
}) => {
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/folder/:folderId"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
