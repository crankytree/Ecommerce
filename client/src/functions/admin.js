import axios from "axios";

export const getOrders = async (authtoken) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: { authtoken },
  });
  return res;
};

export const changeStatus = async (orderId, orderStatus, authtoken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    { headers: { authtoken } }
  );

  return res;
};
