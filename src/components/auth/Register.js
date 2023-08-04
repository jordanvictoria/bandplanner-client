import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./AuthManager";
import "./auth.css";

export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      registerUser(newUser)
        .then((res) => {
          if ("valid" in res && res.valid) {
            setToken(res.token, res.user_id);
            navigate("/");
          } else if ("error" in res) {
            setErrorMessage(res.error);
          }
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          setErrorMessage("An error occurred while registering the user.");
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <section className="custom-background hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4" style={{ marginTop: "-10vh" }}>
              <form
                className=" p-5 rounded-form"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                onSubmit={handleRegister}
              >
                <p className="subtitle">Create an account</p>
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input className="input" type="text" ref={firstName} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control">
                    <input className="input" type="text" ref={lastName} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input className="input" type="text" ref={username} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input" type="email" ref={email} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded">
                        <input className="input" type="password" placeholder="Password" ref={password} />
                      </p>
                    </div>

                    <div className="field">
                      <p className="control is-expanded">
                        <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link is-success" type="submit">Submit</button>
                  </div>
                  <div className="control">
                    <Link to="/login" className="button is-link is-light">Cancel</Link>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
