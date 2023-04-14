import { Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user);
  const history = useHistory();

  useEffect(() => {
    if(user && user.token) history.push("/");
  } , [user])

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    setLoading(true);
    try {
      const res = await auth.sendPasswordResetEmail(email, config);
      setEmail("");
      toast.success("Check your email for password reset link");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className="container col-md-6 p-5 offset-md-3">
      <h4>Forgot Password</h4>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          autoFocus
        />
      <br />
      {/* <button type="submit" className="btn btn-light" disabled={!email}>
        Submit
      </button> */}
      <Button type="primary" loading={loading} disabled={!email} htmlType="submit">
          Submit
        </Button>
      </form>

    </div>
  );
};

export default ForgotPassword;
