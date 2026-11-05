import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Home from "./shared/pages/home/Home";
import Login from "./features/auth/pages/login/Login";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import ThemeBtn from "./shared/components/theme/ThemeBtn";
import ForgotPassword from "./features/auth/pages/forgotPassword/ForgotPassword";
import Register from "./features/auth/pages/register/Register";
import VerificationEmail from "./features/auth/pages/verification/VerificationEmail";
import VerificationLogin from "./features/auth/pages/verification/VerificationLogin";
import Verification2FA from "./features/auth/pages/verification/Verification2FA";
import TwoFactorAuthenticationEnable from "./features/auth/pages/enable2fa/TwoFactorAuthenticationEnable";
import MsgPage from "./features/message/pages/msgPage/MsgPage";
import Profile from "./features/auth/pages/myProfile/Profile";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/profile",
        element: <Profile />,
      },
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
        path: "register",
        element: <Register />,
      },
      {
        path: "verification-email",
        element: <VerificationEmail />,
      },
      {
        path: "two-factor-authentication",
        element: <TwoFactorAuthenticationEnable />,
      },
      { path: "verification-2fa", element: <Verification2FA /> },
      { path: "verification-login", element: <VerificationLogin /> },
    ],
  },
]);
function App() {
  return (
    <>
      <ThemeBtn />
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
