import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import type { LoginResponse } from "../types/index";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Send the login request to the backend
      const res: AxiosResponse<LoginResponse> =
        await axiosInstance.post<LoginResponse>("/users/login", {
          email,
          password,
        });

      // 2. Check if the backend response was successful
      if (res.data.status === "success" && res.data.data.user) {
        // 3. Call the global login function from the AuthContext

        const { name, email: userEmail, photo } = res.data.data.user;
        login({ name, email: userEmail, photo }); // Pass the necessary user data

        console.log("Login successful! Redirecting...");

        // 4. Redirect the user to the homepage or dashboard
        navigate("/");
      }
    } catch (err) {
      // 5. Handle any network or API errors
      console.error("Login failed:", err);

      // Axios error handling: grab the specific error message from the backend
      if (err instanceof Error && "response" in err) {
        const errorResponse = (
          err as { response?: { data?: { message?: string } } }
        ).response;
        setError(
          errorResponse?.data?.message ||
            "An unknown error occurred during login."
        );
      } else {
        setError("An unknown error occurred during login.");
      }
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
