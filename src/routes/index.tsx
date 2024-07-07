import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages";
import NotFoundPage from "../pages/notFoundPage";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

import Books from "../pages/books/index";
import ShowBook from "../pages/books/show";

const App = () => {
  const router = createBrowserRouter([
    {
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        //authentication
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        //authentication

        //books
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/book/:id_book",
          element: <ShowBook />
        },
        //books

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
