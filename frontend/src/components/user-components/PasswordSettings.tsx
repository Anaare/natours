const PasswordSettings = () => {
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>

      {/* The form class for password change is 'form form-user-settings' */}
      <form className="form form-user-settings">
        {/* Current Password Field */}
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>
          <input
            id="password-current"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>

        {/* New Password Field */}
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
          </label>
          <input
            id="password"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>
          <input
            id="password-confirm"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
          />
        </div>

        {/* Save Password Button */}
        <div className="form__group right">
          <button className="btn btn--small btn--green">Save password</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSettings;
