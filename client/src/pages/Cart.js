import { Row, Col, Modal, Space } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((curr, nxt) => {
      return curr + nxt.count * nxt.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log(JSON.stringify(cart , null , 4));
    Modal.confirm({
      title: `Are you sure to Checkout ?`,
      afterClose() {
        userCart(cart, user.token)
          .then((res) => {
            console.log("CART POST RES", res);
            if (res.data.ok) history.push("/checkout");
          })
          .catch((err) => console.log("CART SAVE ERR", err));
      },
    });
  };

  const saveCodOrderToDb = () => {
    // console.log(JSON.stringify(cart , null , 4));
    dispatch({type: "COD" , payload: true})
    Modal.confirm({
      title: `Are you sure to Checkout ?`,
      afterClose() {
        userCart(cart, user.token)
          .then((res) => {
            console.log("CART POST RES", res);
            if (res.data.ok) history.push("/checkout");
          })
          .catch((err) => console.log("CART SAVE ERR", err));
      },
    });
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Colour</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );
  return (
    <div className="container-fluid pt-2">
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <h4>Cart / {cart.length}</h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </Col>
        <Col span={8}>
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <Space>
            <button
              onClick={saveOrderToDb}
              disabled={!cart.length}
              className="btn bth-sm btn-primary mt-2"
              >
              Proceed to checkout
            </button>
            <button
              onClick={saveCodOrderToDb}
              disabled={!cart.length}
              className="btn bth-sm btn-primary mt-2"
              >
              Pay Cash on Delivery
            </button>
              </Space>
          ) : (
            <button className="btn bth-sm btn-primary mt-2">
              <Link to={{ pathname: "/login", state: { from: "/cart" } }} className="text-reset">
                Login to checkout
              </Link>
            </button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
