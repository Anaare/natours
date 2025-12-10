import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";

const UserContent = () => {
  // I NEED TO WORK WITH ADMIN PANEL + ADD FRONTEND PART OF TOURS UPDATING
  return (
    <div className="user-view__content">
      <AccountSettings />
      <div className="line">&nbsp;</div>
      <PasswordSettings />
    </div>
  );
};

export default UserContent;
