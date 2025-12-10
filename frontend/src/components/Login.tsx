// import { useNavigate } from "react-router-dom";
// import type { AxiosResponse } from "axios";
// import { useAuth } from "../hooks/useAuth";
// import axiosInstance from "../api/axiosInstance";
// import type { LoginResponse } from "../types/index";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

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
            />
          </div>

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          <div className="form__group">
            <Link to="" className="forgot_password__el">
              Forgot your password?
            </Link>
          </div>
          <div className="form__group">
            <button
              className="btn btn--green"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
