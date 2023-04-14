import axios from "axios"

export const createOrUpdateUser = async (authToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authToken,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
export const currentUser = async (authToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          authToken,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const currentAdmin = async (authToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/current-admin`,
      {},
      {
        headers: {
          authToken,
        },
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

