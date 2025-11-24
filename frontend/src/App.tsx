import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
