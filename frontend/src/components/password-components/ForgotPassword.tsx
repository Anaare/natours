import { useState } from "react";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { sendUpdatePasswordLink, error, loading } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const data = await sendUpdatePasswordLink(email);
      if (data && data.status === "success") {
        setMessage(
          data.message || "Success! Check your email for the reset link."
        );
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Provide email address:</h2>

        <form className="form" onSubmit={handleSubmit}>
          {message && <div className="success-message">{message}</div>}

          {error && <div className="error-message error">{error}</div>}

          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>

            <input
              className="form__input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" type="submit" disabled={loading}>
              {loading ? "Sending Link..." : "Send Link"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
