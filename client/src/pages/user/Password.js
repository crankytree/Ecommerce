import React from "react";
import UserNav from "../../components/nav/UserNav";
import { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);

      const res = await auth.currentUser.updatePassword(password);
      console.log(res);
      setLoading(false);
      setPassword("");
      toast.success("Password Updated!");
    } 
    catch(err){
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  const passwordUpdateForm = () => {
    return (
      <>
        <form onSubmit={submitHandler}>
          <div className="mb-3">

          <label className="form-label">Your Password</label>
          <input
            className="form-control"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new Password"
            disabled={loading}
          />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!password || password.length < 6 ||loading}>Submit</button>
        </form>
      </>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Password Update</h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
