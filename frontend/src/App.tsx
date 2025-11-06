import Footer from "./components/Footer";
import Header from "./components/Header";
// import Overview from "./pages/Overview";
import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
