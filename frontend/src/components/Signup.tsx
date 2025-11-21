import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">create your account!</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
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
            <label className="form__label" htmlFor="password">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green">Sign up</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
