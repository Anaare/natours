import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

const NavBar = () => {
  const { isLoggedIn, user, logout } = useAuth();
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
        {isLoggedIn ? (
          <>
            {/* Use the logout function */}
            <a href="#" className="nav__el" onClick={logout}>
              Log out
            </a>
            <Link to="/my-bookings" className="nav__el">
              My bookings
            </Link>
            <Link to="/me" className="nav__el">
              {/* <img
                src={`img/${user?.photo}`} // Assuming user object is available
                alt="User photo"
                className="nav__user-img"
              /> */}
              <span>{user?.name.split(" ")[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link to="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
