import React, { useState } from "react";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  const [email, setEmail] = useState("");

  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      url: `${process.env.REACT_APP_REGISTER_REDIRECT_URL}`,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(`Email is sent to ${email}. Click on the link to complete your registration`);

    localStorage.setItem("emailForRegistration", email);

    setEmail("");
  };
  const RegisterForm = () => (
    <form onSubmit={submitHandler}>
      <input
        type={email}
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
      />

      <button type="submit" className="btn btn-light mt-3">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {RegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
