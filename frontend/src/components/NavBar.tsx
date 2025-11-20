import { Link } from "react-router";

const NavBar = () => {
  return (
    <>
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use href="/img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {/* 
        // ONLY AVAILABLE IF USER IS LOGGED IN
        <a href="#" className="nav__el">
          My bookings
        </a>
        <a href="#" className="nav__el">
          <img src="img/user.jpg" alt="User photo" className="nav__user-img" />
          <span>Jonas</span>
        </a> */}

        {/* OBVIOUSLY IF THE USER IS LOGGED IN THIS BUTTONS WILL BE HIDDEN 
            could <Activity/> be useful here?
        */}

        <Link to="/login" className="nav__el">
          Log in
        </Link>
        <Link to="/logout" className="nav__el nav__el--cta">
          Sign up
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
