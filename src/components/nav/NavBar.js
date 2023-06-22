import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./bandplannerlogo.jpeg";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();
  const [isReleaseDropdownVisible, setReleaseDropdownVisible] = useState(false);
  const [isLiveDropdownVisible, setLiveDropdownVisible] = useState(false);
  const [isPressDropdownVisible, setPressDropdownVisible] = useState(false);

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const handleReleaseDropdownToggle = () => {
    setReleaseDropdownVisible(!isReleaseDropdownVisible);
  };

  const handleLiveDropdownToggle = () => {
    setLiveDropdownVisible(!isLiveDropdownVisible);
  };

  const handlePressDropdownToggle = () => {
    setPressDropdownVisible(!isPressDropdownVisible);
  };

  return (
    <nav
      className="navbar is-success "
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem"  alt="Bandplanner Logo" />{" "}
          <h1 className="title is-4 custom-font" style={{ marginLeft: '1rem' }}> Bandplanner</h1>
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

      <div className="navbar-menu" ref={navbar} >
        <div className="navbar-item-container">
          <div>
            {token ? (
              <Link to="/" className="navbar-item">
                Home
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="dropdown-wrapper" onMouseEnter={handleLiveDropdownToggle} onMouseLeave={handleLiveDropdownToggle}>{token ? (
            <>
              <Link to="/live" className="navbar-item ">
                Live
              </Link>
              {isLiveDropdownVisible && (
                <div className="dropdown-content">
                  <li className="dropdown-item">
                    <Link to="/live">Live Events</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/setlist">Setlists</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/showchecklist">Promo Checklist</Link>
                  </li>
                </div>
              )}
            </>
          ) : (
            ""
          )}
          </div>
          <div className="is-success dropdown-wrapper" onMouseEnter={handleReleaseDropdownToggle} onMouseLeave={handleReleaseDropdownToggle}>{token ? (
            <>
              <Link to="/releases" className="navbar-item">
                Releases
              </Link>
              {isReleaseDropdownVisible && (
                <div className="dropdown-content">
                  <li className="dropdown-item">
                    <Link to="/releases">Release Schedule</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/releasechecklist">Promo Checklist</Link>
                  </li>
                </div>
              )}
            </>
          ) : (
            ""
          )}
          </div>
          <div className="is-success dropdown-wrapper" onMouseEnter={handlePressDropdownToggle} onMouseLeave={handlePressDropdownToggle}>{token ? (
            <>
              <Link to="/pressclipping" className="navbar-item">
                Press
              </Link>
              {isPressDropdownVisible && (
                <div className="dropdown-content">
                  <li className="dropdown-item">
                    <Link to="/pressclipping">Press Coverage</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/medialist">Media List</Link>
                  </li>
                </div>
              )}
            </>
          ) : (
            ""
          )}
          </div>
          <div>
            {token ? (
              <Link to="/profile" className="navbar-item">
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
                  <Link to="/register" className="button is-outlined">
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
