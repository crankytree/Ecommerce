import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserOrders } from "../../functions/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

import {
 
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      const res = await getUserOrders(user.token);
      setOrders(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message);
      setLoading(false);
    }
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Colour</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={
        <Invoice order={order}/>
      }
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download Pdf
    </PDFDownloadLink>
  );

  const showEachOrder = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>{orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}</h4>
          {showEachOrder()}
        </div>
      </div>
    </div>
  );
};

export default History;
