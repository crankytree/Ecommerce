import axios from "axios";

export const createPaymentIntent = async (authtoken, coupon) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    { headers: { authtoken } }
  );

  return res;
};
