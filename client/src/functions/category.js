import axios from "axios";
import { auth } from "../firebase";

export const createCategory = async (category, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/category`, category, {
      headers: { authToken },
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getCategory = async (slug) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const updateCategory = async (slug, category, authToken) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
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
export const removeCategory = async (slug, authToken) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
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
