import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    
    if (email && password) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.stat === "wrong" || !data) {
        toast.error("Invalid Credentials");
        console.log("Invalid Registration");
      } else {
        toast.error("Registration Succesfull");
        console.log("Registration Succesfull");
        history.push("/");
      }
    }
  }
  return (

    <>
    
      <div className="container1">
        <div className="row">
          <div className="col-left OnlyLogin">
            <div className="buttons">
              <div className="btn">
                <div className="moverbtn"></div>

                <button className="sigup" id="signup">
                  LogIn
                </button>
              </div>
            </div>
            <form action="/login" className="login" method="POST">
              <div className="heading">
                <h3>LogIn form</h3>
              </div>
              <div className="form-group1">
                <input
                  type="email"
                  placeholder="Enter Your email*"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="form-control"
                  name="email"
                  id="email2"
                />
                <input
                  type="password"
                  placeholder="Enter Password*"
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="form-control"
                  id="password2"
                />
              </div>

              <div className="buttons">
                <button
                  type="submit"
                  onClick={loginUser}
                  className="submit submitLogin"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
};

export default Login;
