import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { createCoupon, getCoupons, removeCoupon } from "../../../functions/coupon";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await getCoupons();

      setCoupons(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    // console.table(name ,expiry , discount);

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        loadCoupons();
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong. Can't create coupon.");
      });
  };

  const removeHandler = async(couponId) => {
    try{
      setLoading(true);
      const res = await removeCoupon(couponId , user.token);

      loadCoupons();
      toast.error(`"${res.data.name} deleted successfully`);
      setLoading(false);
    }catch(err){
      console.log(err);
      toast.error("Somethin went wrong . Can't delete the coupon.")
      setLoading(false);
    }
  }

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Coupon</h4>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="text-muted form-label">Name</label>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted form-label">Discount %</label>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted form-label">Expiry</label>
              <br />
              <DatePicker
                className="form-control mb-3"
                selected={new Date()}
                onChange={(date) => setExpiry(date)}
                value={expiry}
                required
              />
            </div>
            <button className="btn btn-outline-primary mt-1">Save</button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}</td>
                  <td>
                    <Popconfirm
                      title="Delete this Coupon"
                      onConfirm={async () => await removeHandler(c._id)}
                    >
                      <DeleteOutlined className="text-danger pointer" />
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
