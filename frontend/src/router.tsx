import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Overview from "./pages/Overview.tsx";
import Tour from "./pages/Tour.tsx";
import Login from "./components/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Shared layout for the entire app
    children: [
      {
        index: true, // This is the default route for the path '/'
        element: <Overview />,
        // loader: overviewLoader, // Data loading function for the list of tours
      },
      {
        path: "tours/:slug", // I'll need to add ACTUAL NAME of the tour replacing :tourSlug
        element: <Tour />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
