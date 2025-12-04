import type { AxiosResponse } from "axios";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation for password match
    if (password !== passwordConfirm) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Send the signup request to the backend
      const res: AxiosResponse = await axiosInstance.post(
        "/users/signup",
        {
          name: username, // Use 'username' state for the name field
          email,
          password,
          passwordConfirm,
        },
        { withCredentials: true }
      );

      // 2. Check if the backend response was successful
      if (res.data.status === "success" && res.data.data.user) {
        console.log("Signup successful! Redirecting...");
        // You had console.log(name, email) but 'name' is not defined. Using 'username' instead.
        console.log(username, email);

        // 4. Redirect the user to the homepage or dashboard
        navigate("/");
      }
    } catch (err) {
      console.error("Signup failed:", err);

      // Enhanced error handling to correctly extract the message from AxiosError
      // Axios errors often have the response structure needed to get the backend message.
      if (err && typeof err === "object" && "response" in err) {
        // We can safely cast err to a more specific type to access the response property
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "An unknown network error occurred during signup."
        );
      } else {
        setError("An unknown error occurred during signup.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">create your account!</h2>

        <form className="form" onSubmit={handleSubmit}>
          {/* USERNAME / NAME */}
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              {" "}
              {/* Changed htmlFor to 'name' */}
              Your name
            </label>

            <input
              className="form__input"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
            />
          </div>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              {" "}
              {/* Changed htmlFor to 'passwordConfirm' */}
              Confirm Password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="form__group">
              <p className="error-message">{error}</p>{" "}
              {/* Use your actual error class or add one */}
            </div>
          )}

          <div className="form__group">
            <button
              className="btn btn--green"
              type="submit" // Good practice to explicitly set type
              disabled={isLoading} // Disable button while loading
            >
              {/* Display text based on loading state */}
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
