import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { useAuthInit } from "./hooks/useAuthInit";

import "./App.css";

import { UserContextProvider } from "./context/UserContextProvider";

function AppContent() {
  // useAuthInit();

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
