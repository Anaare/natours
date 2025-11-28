import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";

const UserContent = () => {
  return (
    <div className="user-view__content">
      <AccountSettings />
      <div className="line">&nbsp;</div>
      <PasswordSettings />
    </div>
  );
};

export default UserContent;
