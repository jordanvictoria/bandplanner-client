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
  const [isLiveLinkActive, setLiveLinkActive] = useState(false);

  const location = useLocation(); 

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const closeMobileNavbar = () => {
    hamburger.current.classList.remove("is-active");
    navbar.current.classList.remove("is-active");

  };


  const handleLiveDropdownToggle = (event) => {
    event.stopPropagation();
    setLiveDropdownVisible(!isLiveDropdownVisible);
  };

  const handlePressDropdownToggle = (event) => {
    event.stopPropagation();
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


          <div className="dropdown-wrapper" onMouseEnter={handleLiveDropdownToggle} onMouseLeave={handleLiveDropdownToggle}>{token ? (
            <>
              <NavLink to="/live" activeClassName={`${isLiveLinkActive ? "active" : ""}`} className="navbar-item" >
                Live
              </NavLink>
              {isLiveDropdownVisible && (
                <div className="dropdown-content">
                  <li className="dropdown-item">
                    <NavLink to="/live" 
                      onClick={() => {
                        closeMobileNavbar();
                        setLiveLinkActive(true); // Set isLiveLinkActive to true
                      }}
                    >Live Events</NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink to="/setlist" 
                      onClick={() => {
                        closeMobileNavbar();
                        setLiveLinkActive(true); // Set isLiveLinkActive to true
                      }}
                    >Setlists</NavLink>
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



          <div className="is-success dropdown-wrapper" onMouseEnter={handlePressDropdownToggle} onMouseLeave={handlePressDropdownToggle}>{token ? (
            <>
              <NavLink activeClassName="active" to="/pressclipping" className="navbar-item">
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
