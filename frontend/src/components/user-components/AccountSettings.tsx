import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateUser } from "../../hooks/useUpdateUser";

const AccountSettings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const { updateUser, loading: updating, error: updateError } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    // 🔑 CHANGE 1: Create FormData object
    const formData = new FormData();

    // 🔑 CHANGE 2: Append text fields

    formData.append("name", name);
    formData.append("email", email);

    // 🔑 CHANGE 3: Append the file if one is selected
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    // 🔑 CHANGE 4: Pass the FormData object to the hook

    await updateUser(formData);

    setPhotoFile(null);
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

        <div className="form__group">
          <div className="form__photo-upload">
            <img
              className="form__user-photo"
              src={user?.photo || "/img/users/default.jpg"}
              alt="User photo"
            />

            <input
              className="form__upload"
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPhotoFile(e.target.files ? e.target.files[0] : null)
              }
            />

            <label htmlFor="photo">
              {photoFile
                ? `Change photo (${photoFile.name})`
                : "Choose new photo"}
            </label>
          </div>
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">
            {updating ? "Saving..." : "Save settings"}
          </button>
        </div>

        {updateError && <p className="text-red-600 mt-2">{updateError}</p>}
      </form>
    </div>
  );
};

export default AccountSettings;
