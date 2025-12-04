import UserContent from "../components/user-components/UserContent";
import UserNav from "../components/user-components/UserNav";

const User = () => {
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
