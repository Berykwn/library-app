import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages";
import NotFoundPage from "../pages/notFoundPage";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Books from "../pages/books/index";
import ShowBook from "../pages/books/show";
import { HasLoggedIn, ProtectedRoute } from "../routes/protectedRoute";
import EditProfile from "../pages/users/edit-profile";
import MyCart from "../pages/users/my-cart";
import AdminDashboard from "../pages/admin/index";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: (
        <HasLoggedIn redirectTo="/">
          <Login />
        </HasLoggedIn>
      ),
    },
    {
      path: "/register",
      element: (
        <HasLoggedIn redirectTo="/">
          <Register />
        </HasLoggedIn>
      ),
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/book/:id_book",
      element: <ShowBook />,
    },
    {
      path: "/admin-dashboard",
      element: (
        <ProtectedRoute redirectTo="/">
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <ProtectedRoute redirectTo="/">
          <EditProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my-cart",
      element: (
        <ProtectedRoute redirectTo="/">
          <MyCart />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
