import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Home from "./shared/pages/home/Home";
import Login from "./features/auth/pages/login/Login";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import ThemeBtn from "./components/theme/ThemeBtn";
import ForgotPassword from "./features/auth/pages/forgotPassword/ForgotPassword";
import Register from "./features/auth/pages/register/Register";
import VerificationEmail from "./features/auth/pages/verificationEmail/VerificationEmail";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
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
