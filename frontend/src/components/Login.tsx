const Login = () => {
  return (
    <main className="main">
      <div className="login-form">
        {/* 1. Use SPACES for classes, not dots */}
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form">
          <div className="form__group">
            {/* 2. Use htmlFor instead of for */}
            <label className="form__label" htmlFor="email">
              Email address
            </label>

            {/* 3. Add all the attributes from PUG (id, type, placeholder) */}
            <input
              className="form__input"
              id="email"
              type="email"
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
              type="password" // Vital for security!
              placeholder="••••••••"
              required
              minLength={8} // Note the camelCase and curly braces for numbers
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
