import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Overview from "./pages/Overview.tsx";
import Tour from "./pages/Tour.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import User from "./pages/User.tsx";
import ForgotPassword from "./components/password-components/ForgotPassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
        // loader: overviewLoader, // Data loading function for the list of tours
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
    ],
  },
]);
export default router;
