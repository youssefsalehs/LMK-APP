import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./pages/mainLayout/MainLayout";
import Home from "./pages/home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
