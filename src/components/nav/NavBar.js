import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Rare Logo" />{" "}
          <h1 className="title is-4">Bandplanner</h1>
        </a>

        
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          <div>
            {token ? (
              <Link to="/" className="navbar-item">
                Home
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {token ? (
              <Link to="/my-posts" className="navbar-item">
                Releases
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>{token ? (
              <Link to="/postForm" className="navbar-item">
                Live
              </Link>
            ) : (
              ""
            )}</div>
          <div>
            {token ? (
              <Link to="/categories" className="navbar-item">
                Press
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {token ? (
              <Link to="/tags" className="navbar-item">
                Notes
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {token ? (
              <Link to="/users" className="navbar-item">
                Profile
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
