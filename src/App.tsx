import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import ForgotPassword from "./features/auth/pages/forgotPassword/ForgotPassword";
import Login from "./features/auth/pages/login/Login";
import Register from "./features/auth/pages/register/Register";
import ResetPassword from "./features/auth/pages/resetPassword/ResetPassword";
import VerificationEmail from "./features/auth/pages/verification/VerificationEmail";
import VerificationLogin from "./features/auth/pages/verification/VerificationLogin";
import Messages from "./features/message/pages/messages/Messages";
import MsgPage from "./features/message/pages/msgPage/MsgPage";

import IncomingRequests from "./features/request/pages/incomingRequests/IncomingRequests";
import SentRequests from "./features/request/pages/sentRequests/SentRequests";
import TwoFactorAuth from "./features/user/pages/enable2fa/TwoFactorAuth";
import Profile from "./features/user/pages/myProfile/Profile";
import UpdatePassword from "./features/user/pages/updatePassword/UpdatePassword";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import ThemeBtn from "./shared/components/theme/ThemeBtn";
import Home from "./shared/pages/home/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "messages", element: <Messages /> },
      { path: "sent-requests", element: <SentRequests /> },
    ],
  },
  {
    path: "/profile",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Profile /> },
      { path: "update-password", element: <UpdatePassword /> },
      { path: "enable-2fa", element: <TwoFactorAuth /> },
      { path: "incoming-requests", element: <IncomingRequests /> },
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
      <ThemeBtn />
    </>
  );
}

export default App;
