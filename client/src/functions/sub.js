import axios from "axios";
import { auth } from "../firebase";

export const createSub = async (sub, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
      headers: { authToken },
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSubs = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/subs`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getSub = async (slug) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const updateSub = async (slug, sub, authToken) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
      headers: {
        authToken,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const removeSub = async (slug, authToken) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
      headers: {
        authToken,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
