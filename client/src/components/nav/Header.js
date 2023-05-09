import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat";
import { Badge, Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import Search from "../forms/Search";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const clickHandler = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logoutHandler = async () => {
    // console.log(auth.currentUser);
    firebase.auth().signOut();
    // await auth.signOut();
    // console.log(auth.currentUser);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  const rightStyle = { position: "absolute", top: 0, right: 0 };
  return (
    <Menu mode="horizontal" selectedKeys={[current]} onClick={clickHandler}>
      <Menu.Item
        key="home"
        icon={<AppstoreOutlined />}
        className="float-start d-flex align-items-center"
      >
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item
        key="shop"
        icon={<ShoppingOutlined />}
        className="float-start d-flex align-items-center"
      >
        <Link to="/shop">Shop</Link>
      </Menu.Item>
      <Menu.Item
        key="cart"
        icon={<ShoppingCartOutlined />}
        className="float-start d-flex align-items-center"
      >
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>

      {!user && (
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          className="d-flex align-items-center float-end"
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}

      {user && (
        <Menu.SubMenu title={user.email && user.email.split("@")[0]} className="float-end">
          {user && user.role === "subscriber" && (
            <Menu.Item key="item1">
              <Link to="/user/history">Dashboard</Link>
            </Menu.Item>
          )}

          {user && user.role === "admin" && (
            <Menu.Item key="item2">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}
          <Menu.Item icon={<LoginOutlined />} onClick={logoutHandler}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      )}

      {!user && (
        <Menu.Item
          key="login"
          icon={<UserOutlined />}
          className="d-flex align-items-center float-end"
        >
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}

      <Menu.Item key="search" className="float-end">
        <Search />
      </Menu.Item>
    </Menu>
  );
};

export default Header;
