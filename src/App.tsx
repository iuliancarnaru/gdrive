import { ReactElement } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/Signup";
import { Test } from "./components/Test";
import { Welcome } from "./components/Welcome";
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
      <Route path="/" element={<Welcome />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="test"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Test />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
