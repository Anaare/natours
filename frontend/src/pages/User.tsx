import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import UserContent from "../components/user-components/UserContent";
import UserNav from "../components/user-components/UserNav";

const User = () => {
  const { user, isInitializing } = useAuth();
  console.log(user);

  if (isInitializing) {
    return (
      <main className="main">
        <div className="spinner">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="main">
      <div className="user-view">
        <UserNav />
        <UserContent />
      </div>
    </main>
  );
};

export default User;
