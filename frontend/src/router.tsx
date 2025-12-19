import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Overview from "./pages/Overview.tsx";
import Tour from "./pages/Tour.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import User from "./pages/User.tsx";
import ForgotPassword from "./components/password-components/ForgotPassword.tsx";
import ResetPassword from "./components/password-components/ResetPassword.tsx";
import BookedTours from "./components/user-components/BookedTours.tsx";
import UserReviews from "./components/user-components/UserReviews.tsx";
import Billing from "./components/user-components/Billing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "tours/:slug",
        element: <Tour />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/me",
        element: <User />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetPassword/:token",
        element: <ResetPassword />,
      },
      {
        path: "/my-tours",
        element: <BookedTours />,
      },
      {
        path: "/my-reviews",
        element: <UserReviews />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
    ],
  },
]);
export default router;
