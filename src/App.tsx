import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import ForgotPassword from "./features/auth/pages/forgotPassword/ForgotPassword";
import Login from "./features/auth/pages/login/Login";
import Register from "./features/auth/pages/register/Register";
import VerificationEmail from "./features/auth/pages/verification/VerificationEmail";
import VerificationLogin from "./features/auth/pages/verification/VerificationLogin";
import MsgPage from "./features/message/pages/msgPage/MsgPage";
import TwoFactorAuth from "./features/user/pages/enable2fa/TwoFactorAuth";
import Profile from "./features/user/pages/myProfile/Profile";
import UpdatePassword from "./features/user/pages/updatePassword/UpdatePassword";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Home from "./shared/pages/home/Home";
import ResetPassword from "./features/auth/pages/resetPassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/profile",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Profile /> },
      { path: "update-password", element: <UpdatePassword /> },
      { path: "enable-2fa", element: <TwoFactorAuth /> },
    ],
  },
  {
    path: "/:username",
    element: <MsgPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verification-email",
        element: <VerificationEmail />,
      },

      { path: "verification-login", element: <VerificationLogin /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
