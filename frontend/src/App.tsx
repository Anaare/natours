import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { useAuthInit } from "./hooks/useAuthInit";

import "./App.css";

import { UserContextProvider } from "./context/UserContextProvider";
import { useAuth } from "./hooks/useAuth";

function AppContent() {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <div className="app-loading">Loading...</div>;
  }

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
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

export default App;
