import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateUser } from "../../hooks/useUpdateUser";

const AccountSettings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const {
    updateUser,
    // updatedUser,
    loading: updating,
    error: updateError,
  } = useUpdateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    await updateUser(user._id ?? "", { name, email });
  };

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

      <form className="form form-user-data" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Name</label>
          <input
            className="form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn btn--small btn--green">
          {updating ? "Saving..." : "Save settings"}
        </button>

        {updateError && <p className="text-red-600 mt-2">{updateError}</p>}
      </form>
    </div>
  );
};

export default AccountSettings;
