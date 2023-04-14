import { Switch, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useEffect } from "react";
import { auth } from "./firebase";
import { async } from "@firebase/util";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoutes from "./components/routes/UserRoutes";
import Password from "./pages/user/Password";
import WishList from "./pages/user/WishList";
import AdminRoutes from "./components/routes/AdminRuotes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/Category/CategoryCreate";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        // console.log("token" , idTokenResult);
        currentUser(idTokenResult.token).then((res) => {
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
        
      }
    });

    return () => unSubscribe();
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/register/complete">
          <RegisterComplete />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgot/password">
          <ForgotPassword />
        </Route>
        <UserRoutes exact path="/user/history">
          <History/>
        </UserRoutes>
        <UserRoutes exact path="/user/password">
          <Password/>
        </UserRoutes>
        <UserRoutes exact path="/user/wishlist">
          <WishList/>
        </UserRoutes>
        <AdminRoutes exact path="/admin/dashboard">
          <AdminDashboard/>
        </AdminRoutes>
        <AdminRoutes exact path="/admin/category">
          <CategoryCreate/>
        </AdminRoutes>
      </Switch>
    </>
  );
}

export default App;
