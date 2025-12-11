// src/components/password-components/ResetPassword.tsx

import React, { useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/useResetPassword";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // We will create this custom hook next
  const { loading, resetPassword } = useResetPassword();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Ensure we have the token and passwords match
    if (!token) return setError("Reset token is missing or invalid.");
    if (password !== passwordConfirm)
      return setError("Passwords do not match.");

    try {
      // Call the hook to send the PATCH request to your backend's /resetPassword/:token endpoint
      const data = await resetPassword(token, password, passwordConfirm);

      // The hook should return success data or throw an error
      if (data && data.status === "success") {
        setMessage("Password updated successfully! You are now logged in.");
        // User is logged in automatically because the backend sends the JWT cookie
        setPassword("");
        setPasswordConfirm("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary heading-secondary--form">
          Set New Password
        </h2>

        {/* Display messages/errors */}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Only show the form if the token is present */}
        {token ? (
          <form className="form form--reset-password" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="password">
                New Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <input
                className="form__input"
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form__group">
              <button className="btn btn--green" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        ) : (
          // Show this if the token is somehow missing from the URL
          <div className="error-message">Invalid or missing reset link.</div>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
