import axios from "axios";

export const getCoupons = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}/coupons`);
  return res;
};
export const removeCoupon = async (couponId, authtoken) => {
  const res = await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, { headers: { authtoken } });
  return res;
};
export const createCoupon = async (coupon, authtoken) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/coupon`, {coupon} , { headers: { authtoken } });
  return res;
};
