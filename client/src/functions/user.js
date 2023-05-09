import axios from "axios";

export const userCart = async (cart, authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    { headers: { authtoken } }
  );

  return res;
};
export const getUserCart = async (authtoken) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/user/cart`, { headers: { authtoken } });

  return res;
};
export const emptyUserCart = async (authtoken) => {
  const res = await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });

  return res;
};
export const saveUserAddress = async (authtoken, address) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    { headers: { authtoken } }
  );

  return res;
};
export const applyCoupon = async (authtoken, coupon) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    { headers: { authtoken } }
  );

  return res;
};
export const createOrder = async (stripeResponse, authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    { headers: { authtoken } }
  );

  return res;
};

export const getUserOrders = async (authtoken) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: { authtoken },
  });

  return res;
};
export const getWishlist = async (authtoken) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/user/wishlist `, {
    headers: { authtoken },
  });

  return res;
};
export const removeWishlist = async (productId, authtoken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId} `,
    {},
    { headers: { authtoken } }
  );

  return res;
};
export const addToWishlist = async (productId, authtoken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist `,
    { productId },
    { headers: { authtoken } }
  );

  return res;
};

export const createCashOrderForUser = async ( authtoken , cod ,coupon) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    {cod , couponApplied: coupon},
    { headers: { authtoken } }
  );

  return res;
};
