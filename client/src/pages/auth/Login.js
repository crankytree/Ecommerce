import React, { useState } from "react";
import axios from "axios";

import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
  const [email, setEmail] = useState("crankytree28082000@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    let intended = history.location.state;
    if (intended?.from) {
      return;
    }
    if (user && user.token) history.push("/");
  }, [user]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended?.from) {
      history.push(intended.from);
      return;
    }
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.table(email, password);
    setLoading(true);

    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      // console.log(res);

      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      setLoading(false);
      // history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const res = await auth.signInWithPopup(googleAuthProvider);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      // history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const loginForm = () => (
    <form>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
      />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your Password"
      />
      <br />

      <Button
        onClick={submitHandler}
        type="primary"
        className="mb-3"
        block
        shape="round"
        size="large"
        disabled={!email || password.length < 6}
        loading={loading}
      >
        <MailOutlined />
        Login with Email/Password
      </Button>

      <Button
        onClick={googleLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        size="large"
        loading={loading}
      >
        <GoogleOutlined />
        Login with Google
      </Button>

      <Link to="/forgot/password" className="float-end">
        Forgot Password
      </Link>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
