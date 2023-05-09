import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Select } from "antd";
import {CheckCircleOutlined , CloseCircleOutlined} from "@ant-design/icons"

const Order = (props) => {
  const { orders, statusChangeHandler } = props;

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

  return (
    <>
      {orders.map((order) => (
        <div className="btn btn-block bg-light">
          <div key={order._id} className="row pb-5">
            <ShowPaymentInfo order={order} showStatus={false} />
          </div>
          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-8">
              <Select
                onChange={(val) => statusChangeHandler(order._id, val)}
                className="w-100"
                defaultValue={order.orderStatus}
              >
                <Select.Option value="Not Processed">Not Processed</Select.Option>
                <Select.Option value="Cash On Delivery">Cash On Delivery</Select.Option>
                <Select.Option value="Dispatched">Dispatched</Select.Option>
                <Select.Option value="Cancelled">Cancelled</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </div>
          </div>
          <br/>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Order;
