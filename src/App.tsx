import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import ThemeBtn from "./components/theme/ThemeBtn";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Register from "./pages/register/Register";

function App() {
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
      ],
    },
  ]);
  return (
    <>
      <ThemeBtn />
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
