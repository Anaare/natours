import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuthInit } from "./hooks/useAuthInit";

import "./App.css";
import { AuthProvider } from "./context/AuthProvider";

function AppContent() {
  // Initialize auth state on app load (fetch current user if logged in)
  useAuthInit();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
