import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector , useDispatch } from "react-redux";

import {createOrUpdateUser} from "../../functions/auth"

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
    if(!email || !password){
      throw new Error("Email and Password is required");
    }

    if(password.length < 6){
      throw new Error("Password must be 6 characters long");
    }
      const res = await auth.signInWithEmailLink(email , window.location.href);
      
      if(res.user.emailVerified){
        localStorage.removeItem("emailForRegistration");  

        let user = auth.currentUser;

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        //Redux store
        console.log('user' , user , 'idTokenResult' , idTokenResult);

        createOrUpdateUser(idTokenResult.token).then((res) => {
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
        }).catch(err => console.log(err))
        //redirect
        history.push('/');
      }
    } catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const completeRegistrationForm = () => (
    <form onSubmit={submitHandler}>
      <input
        type="email"
        className="form-control mb-3"
        value={email}
        disabled
        autoFocus
      />
      <input
        type="password"
        className="form-control mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />

      <button type="submit" className="btn btn-light">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
