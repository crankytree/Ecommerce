import axios from "axios";

export const createProduct = async (product, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/product`, product, {
      headers: { authToken },
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProductByCount = async (count) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
  return res;
};

export const getProduct = async (slug) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
  return res;
};

export const removeProduct = async (slug, authToken) => {
  const res = await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: { authToken },
  });
  return res;
};

export const updateProduct = async (slug, product, authToken) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
      headers: { authToken },
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProducts = async (sort = "createdAt", order = "asc", limit = 3, page = 1) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    limit,
    page,
  });
  return res;
};

export const getProductCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const productSart = async (productId, star, authToken) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/product/star/${productId}`,
      { star },
      {
        headers: { authToken },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRelated = async (productId) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
  return res;
};

export const fetchProductsByFilter = async(arg) => {
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}/search/filters` , arg);
    return res;
  } catch(err){
    console.log(err);
    throw err;
  }
}
