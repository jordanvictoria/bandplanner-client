import { useRef, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Logo from "./bandplannerlogo.jpeg";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();
  const [isLiveDropdownVisible, setLiveDropdownVisible] = useState(false);
  const [isPressDropdownVisible, setPressDropdownVisible] = useState(false);
  const location = useLocation(); // Get the current location

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const closeMobileNavbar = () => {
    // Check if any of the dropdowns are open, and do not close the menu in that case
    if (!isLiveDropdownVisible && !isPressDropdownVisible) {
      hamburger.current.classList.remove("is-active");
      navbar.current.classList.remove("is-active");
    }
  };

  
  const handleLiveDropdownToggle = () => {
    setLiveDropdownVisible(!isLiveDropdownVisible);
  };

  const handlePressDropdownToggle = () => {
    setPressDropdownVisible(!isPressDropdownVisible);
  };

  const toggleLiveDropdown = () => {
    if (window.innerWidth <= 768) {
      // For mobile devices, toggle the dropdown on click
      handleLiveDropdownToggle();
    }
  };

  const togglePressDropdown = () => {
    if (window.innerWidth <= 768) {
      // For mobile devices, toggle the dropdown on click
      handlePressDropdownToggle();
    }
  };

  const isLiveActive = () => {
    const isActive = location.pathname.includes("/live") || location.pathname.includes("/setlist");
    console.log("Is 'Live' Active?", isActive);
    return isActive;
  };
  

  return (
    <nav
      className="navbar is-success "
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Bandplanner Logo" />{" "}
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
              <NavLink to="/" exact activeClassName="active" className="navbar-item" onClick={closeMobileNavbar}>
                Home
              </NavLink>
            ) : (
              ""
            )}
          </div>
          <div className="dropdown-wrapper" onClick={toggleLiveDropdown} onMouseEnter={handleLiveDropdownToggle} onMouseLeave={handleLiveDropdownToggle}>{token ? (
            <>
              <NavLink activeClassName="active" to="/live" className={`navbar-item ${isLiveActive() ? "active" : ""}`}  onClick={closeMobileNavbar}>
                Live
              </NavLink>
              {isLiveDropdownVisible && (
                <div className="dropdown-content">
                  <li className="dropdown-item">
                    <NavLink activeClassName="active" to="/live" onClick={closeMobileNavbar}>Live Events</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink activeClassName="active" to="/setlist" onClick={closeMobileNavbar}>Setlists</NavLink>
                  </li>
                </div>
              )}
            </>
          ) : (
            ""
          )}
          </div>
          <div >
            {token ? (

              <NavLink activeClassName="active" to="/releases" className="navbar-item" onClick={closeMobileNavbar}>
                Releases
              </NavLink>

            ) : (
              ""
            )}
          </div>

          <div className="is-success dropdown-wrapper" onClick={togglePressDropdown} onMouseEnter={handlePressDropdownToggle} onMouseLeave={handlePressDropdownToggle}>{token ? (
            <>
              <NavLink activeClassName="active" to="/pressclipping" className="navbar-item" onClick={closeMobileNavbar}>
                Press
              </NavLink>
              {isPressDropdownVisible && (
                <div className="dropdown-content">
                  <li className="dropdown-item">
                    <NavLink activeClassName="active" to="/pressclipping" onClick={closeMobileNavbar}>Press Coverage</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink activeClassName="active" to="/medialist" onClick={closeMobileNavbar}>Media List</NavLink>
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
              <NavLink activeClassName="active" to="/profile" className="navbar-item" onClick={closeMobileNavbar}>
                Profile
              </NavLink>
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
                    closeMobileNavbar();
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink activeClassName="active" to="/register" className="button is-outlined" onClick={closeMobileNavbar}>
                    Register
                  </NavLink>
                  <NavLink activeClassName="active" to="/login" className="button is-outlined" onClick={closeMobileNavbar}>
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
