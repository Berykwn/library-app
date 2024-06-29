import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages";
import NotFoundPage from "../pages/notFoundPage";

const App = () => {
  const router = createBrowserRouter([
    {
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
