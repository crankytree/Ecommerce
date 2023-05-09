import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createPaymentIntent } from "../functions/stripe";
import { Card } from "antd";
import { CheckOutlined, DashOutlined, DollarOutlined } from "@ant-design/icons";
import ps5 from "../images/ps5.jpg";
import { createOrder, emptyUserCart } from "../functions/user";

const StripeCheckout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(false);
  const [processing, setProccessing] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [payable, setPayable] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setPaymentIntent();
  }, []);

  const setPaymentIntent = async () => {
    try {
      const res = await createPaymentIntent(user.token, coupon);
      // console.log("STRIPW RES", res.data);
      setClientSecret(res.data.clientSecret);

      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    } catch (err) {
      console.log(err);
    }
  };

  const addOrder = async(payload) => {
    try{
      const res = await createOrder(payload , user.token);
      if(res.data.ok){
        if(typeof window !== undefined){
          localStorage.removeItem('cart');
        }

        dispatch({type: "ADD_TO_CART" , payload: []});
        dispatch({type: "COUPON_APPLIED" , payload: false});
      }

      const emptyCart = await emptyUserCart(user.token);
    }catch(err){
      console.log(err);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setProccessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProccessing(false);
    } else {
      console.log(JSON.stringify(payload, null, 4));

      await addOrder(payload);
      setError(null);
      setProccessing(false);
      setSucceeded(true);
    }
  };
  const changeHandler = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <div className="text-center p-5">
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
        <Card
          cover={
            <img src={ps5} style={{ height: "200px", objectFit: "cover", marginBottom: "-50px" }} />
          }
          actions={[
            <div className="text-center">
              <DollarOutlined className="text-info" />
              <br />
              Total: ${cartTotal}
            </div>,
            <div className="text-center">
              <CheckOutlined className="text-info" />
              <br />
              Total Payable: ${(payable / 100).toFixed(2)}
            </div>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={submitHandler}>
        <CardElement id="card-element" options={cardStyle} onChange={changeHandler} />
        <button className="stripe-button" disabled={processing || disabled || succeeded}>
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successfull. <Link to="/user/history">see it in your Purchase history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
