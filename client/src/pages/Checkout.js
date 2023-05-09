import { Col, Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, createCashOrderForUser, emptyUserCart, getUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => ({ ...state }));

  const {user , cod} = reduxState;
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    loadUserCart();
  }, []);

  const loadUserCart = async () => {
    try {
      const res = await getUserCart(user.token);

      // console.log(res.data);

      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    } catch (err) {
      console.log("CANT GET CART ERR", err);
    }
  };

  const saveAddressToDb = () => {
    // console.log(address);

    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address Saved!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong. Can't update address.");
      });
  };

  const emptyCart = () => {
    if (typeof window !== undefined) {
      emptyUserCart(user.token)
        .then((res) => {
          localStorage.removeItem("cart");

          dispatch({ type: "ADD_TO_CART", payload: [] });

          setProducts([]);
          setTotal(0);
          setTotalAfterDiscount(0);
          setCoupon("");
          toast.success("Cart is empty. Continue Shoping.");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong can't empty Cart.");
        });
    }
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button onClick={saveAddressToDb} className="btn btn-primary mt-2">
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = ${p.product.price * p.count}
        </p>
      </div>
    ));

  const applyDiscountCoupon = async () => {
    // console.log("send coupon" , coupon);

    try {
      const res = await applyCoupon(user.token, coupon);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({ type: "COUPON_APPLIED", payload: true });
      }

      if (res.data.message) {
        setDiscountError(res.data.message);
        dispatch({ type: "COUPON_APPLIED", payload: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control mb-3"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary">
        Apply Discount Coupon
      </button>
    </>
  );

  const createCashOrder = async() => {
    try{
      const res = await createCashOrderForUser(user.token , cod , reduxState.coupon);

      if(res.data.ok){
        if(typeof window !== undefined){
          localStorage.removeItem("cart");
        }

        dispatch({type: "ADD_TO_CART" , payload: []})
        dispatch({type: "COUPON_APPLIED" , payload: false})
        dispatch({type: "COD" , payload: false})

        emptyUserCart(user.token);

        setTimeout(() => {history.push("/user/history")} , 1000)
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Row gutter={20}>
      <Col span={12} className="gutter-row">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />

        {discountError && <p className="text-bg-danger p-2">{discountError}</p>}
      </Col>
      <Col span={12} className="gutter-row">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total}</p>

        {totalAfterDiscount > 0 && (
          <p className="text-bg-success p-2">
            Discount Applied: Net Payable: ${totalAfterDiscount}
          </p>
        )}

        <Row>
          <Col span={12}>
            {cod ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
          </Col>
          <Col span={12}>
            <button className="btn btn-primary" disabled={!products.length} onClick={emptyCart}>
              Empty Cart
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Checkout;
