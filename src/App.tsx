import { ReactElement } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/Signup";
import { Test } from "./components/Test";
import { Welcome } from "./components/Welcome";
import { useAuth } from "./contexts/authContext";

function RequireAuth({ children }: { children: ReactElement }) {
  let { currentUser } = useAuth();
  let location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}

// const ProtectedRoute = ({
//   isAllowed,
//   children,
// }: {
//   isAllowed: boolean;
//   redirectPath?: string;
//   children?: ReactElement;
// }) => {
//   if (!isAllowed) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children ? children : <Outlet />;
// };

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="test"
        element={
          <RequireAuth>
            <Test />
          </RequireAuth>
        }
      />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;
