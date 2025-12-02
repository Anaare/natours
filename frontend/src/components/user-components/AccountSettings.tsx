import { useAuth } from "../../hooks/useAuth";

const AccountSettings = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">
          Loading account settings...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md text-red-600">
          Error loading data: {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

      <form className="form form-user-data">
        {/* Name Field */}
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="form__input"
            type="text"
            defaultValue={user?.name || ""}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className="form__input"
            type="email"
            defaultValue={user?.email || ""}
            required
          />
        </div>

        {/* Photo Upload Group */}
        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={`/img/users/${user?.photo}`}
            alt="User photo"
          />
          {/* Using a standard button/input for file upload in a real app, 
                but keeping the original structure with 'a.btn-text' for now. 
                This would typically be a hidden <input type="file" /> associated with a <label> */}
          <a className="btn-text" href="#">
            Choose new photo
          </a>
        </div>

        {/* Save Settings Button */}
        <div className="form__group right">
          <button className="btn btn--small btn--green">Save settings</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
