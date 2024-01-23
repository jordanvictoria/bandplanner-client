import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "./AuthManager"
import "./auth.css"


export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)
  const [defaultUsername, setDefaultUsername] = useState("")
  const [defaultPassword, setDefaultPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value || defaultUsername,
      password: password.current.value || defaultPassword
    }

    loginUser(user).then(res => {
      if ("valid" in res && res.valid) {
        setToken(res.token, res.user_id)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }



  return (
    <section className="custom-background hero is-fullheight">
      <div className="hero-body">
        <div className="container ">
          <div className="columns">
            <div className="column is-4 is-offset-4" style={{ marginTop: '-30vh' }}>
              <form className=" p-5 rounded-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} onSubmit={handleLogin}>
                <p className="subtitle">Please sign in</p>

                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input 
                    className="input" 
                    name="username"
                    type="text" 
                    ref={username} 
                    value={defaultUsername}
                    onChange={e => setDefaultUsername(e.target.value)}
                    required="required" />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input 
                    className="input"
                    name="password" 
                    type="password"
                    ref={password}
                    value={defaultPassword}
                    onChange={e => setDefaultPassword(e.target.value)}
                    required="required" />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link is-success" type="submit" >Submit</button>
                  </div>
                  <div className="control">
                    <Link to="/register" className="button is-link is-light">Cancel</Link>
                  </div>
                </div>
                {
                  isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
