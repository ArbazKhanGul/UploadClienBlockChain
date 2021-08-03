import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  let name, value;
  function handleinput(e) {
    name = e.target.name;
    value = e.target.value;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();
    const { firstname, lastname, email, phone, password, confirmpassword } =
      user;

    if (
      firstname &&
      lastname &&
      email &&
      phone &&
      password &&
      confirmpassword
    ) {
      if (password === confirmpassword) {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/registeration`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              firstname,
              lastname,
              email,
              phone,
              password,
            }),
          }
        );

        const data = await res.json();

        if (data.stat === "wrong" || !data) {
          toast.error(data.error);
          console.log("Invalid Registration");
        } else {
          toast.success("Registration successfull");
          console.log("Registration Succesfull");
          history.push("/Login");
        }
      } else {
        toast.error("Password and Confirm Password must be same");
      }
    } else {
      toast.error("Please fill  all the fields");
    }
  }

  
  return (
    <>
    
      <div className="container1">
        <div className="row">
          <div className="col-left">
            <div className="buttons">
              <div className="btn">
                <div className="moverbtn"></div>

                <button className="sigup" id="signup">
                  SignUp
                </button>
              </div>
            </div>

            <form method="POST" className="logup">
              <div className="heading">
                <h3>Registration Form</h3>
              </div>
              <div className="form-group1">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="First Name*"
                  value={user.firstname}
                  onChange={handleinput}
                  name="firstname"
                  id="firstname"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  autoComplete="off"
                  className="form-control"
                  value={user.lastname}
                  onChange={handleinput}
                  name="lastname"
                  id="lastname"
                  required
                />
              </div>

              <div className="form-group1">
                <input
                  type="email"
                  placeholder="Enter your email*"
                  autoComplete="off"
                  className="form-control"
                  value={user.email}
                  onChange={handleinput}
                  name="email"
                  id="email"
                  required
                />
                <input
                  type="tel"
                  autoComplete="off"
                  placeholder="Your Phone*"
                  value={user.phone}
                  onChange={handleinput}
                  name="phone"
                  className="form-control"
                  id="phone"
                  required
                />
              </div>

              <div className="form-group1">
                <input
                  type="password"
                  placeholder="Enter password*"
                  className="form-control"
                  value={user.password}
                  onChange={handleinput}
                  name="password"
                  id="password"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter confirm password*"
                  className="form-control"
                  value={user.confirmpassword}
                  onChange={handleinput}
                  name="confirmpassword"
                  id="confirmpassword"
                  required
                />
              </div>

              <div className="AlreadyAccount">
                {" "}
                <NavLink to="/Login"> Already have a account</NavLink>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="submit loginform"
                  onClick={postData}
                >
                  Register Now
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

export default Registration;
