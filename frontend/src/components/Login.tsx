import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate for redirection
import axios from "axios"; // 👈 Use AxiosResponse type
import type { AxiosResponse } from "axios";
import { useAuth } from "../hooks/useAuth";
import type { LoginResponse } from "../types/index";

const Login = () => {
  // Destructure the login function from the custom hook
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize navigate hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading visual feedback

  // Make handleSubmit an async function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Send the login request to the backend
      const res: AxiosResponse<LoginResponse> = await axios<LoginResponse>({
        method: "POST",
        url: "/api/v1/users/login",
        data: {
          email,
          password,
        },
        withCredentials: true, // Necessary to send and receive HTTP-only cookies
      });

      console.log(res);

      // 2. Check if the backend response was successful
      if (res.data.status === "success" && res.data.data.user) {
        // 3. Call the global login function from the AuthContext
        // This updates the global state (isLoggedIn to true, sets user data)
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
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred during login.");
      }
    } finally {
      // 6. Always stop loading state
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form" onSubmit={handleSubmit}>
          {/* Display error message if present */}
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
              {/* Show loading text while submitting */}
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
