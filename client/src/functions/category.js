import axios from "axios";

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

export const getCategoryById = async(id) => {
  try{
    const res = await axios.get(`${process.env.REACT_APP_API}/category-by-id/${id}`);
    return res;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

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

export const getCategorySubs = async(_id) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
