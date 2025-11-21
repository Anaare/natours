import axios from "axios";
import { useState } from "react";

// I need to move all my types to the file I have for it
// Why doesn't cookies show up in application (chrome)

interface LoginResponse {
  status: string;
  token?: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      photo: string;
    };
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunction = async (): Promise<LoginResponse | void> => {
    try {
      const res = await axios<LoginResponse>({
        method: "POST",
        url: "/api/v1/users/login",
        data: {
          email,
          password,
        },
        withCredentials: true,
      });

      console.log("Success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload
    await loginFunction();
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form" onSubmit={handleSubmit}>
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
            <button className="btn btn--green" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
