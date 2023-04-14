import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
import { useState } from "react";
import { useEffect } from "react";
import { currentAdmin } from "../../functions/auth";
import { Spin } from "antd";

const AdminRoutes = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [notOk , setNotOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      setLoading(true);
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
          setNotOk(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setOk(false);
          setNotOk(true);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <>
      <Spin spinning={loading}>

      {ok && !loading && <Route {...rest}>{children}</Route>}
      {notOk && !loading && <LoadingToRedirect />}
      </Spin>
    </>
  );
};

export default AdminRoutes;
