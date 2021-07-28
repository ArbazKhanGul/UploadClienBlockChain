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
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
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
              <div class="btn">
                <div class="moverbtn"></div>

                <button class="sigup" id="signup">
                  LogIn
                </button>
              </div>
            </div>
            <form action="/login" class="login" method="POST">
              <div class="heading">
                <h3>LogIn form</h3>
              </div>
              <div class="form-group1">
                <input
                  type="email"
                  placeholder="Enter Your email*"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  class="form-control"
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
                  class="form-control"
                  id="password2"
                />
              </div>

              <div class="buttons">
                <button
                  type="submit"
                  onClick={loginUser}
                  class="submit submitLogin"
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
