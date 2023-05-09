import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeStatus, getOrders } from "../../functions/admin";
import Orders from "../../components/order/Order"

const AdminDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders(user.token);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  const statusChangeHandler = async (orderId, orderStatus) => {
    try {
      const res = await changeStatus(orderId, orderStatus, user.token);
      toast.success("Status Updated");
      loadOrders();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <Spin spinning={loading}>
            <h4>Admin Dashboard</h4>
            {/* {JSON.stringify(orders)}; */}
            <Orders orders={orders} statusChangeHandler={statusChangeHandler} />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
