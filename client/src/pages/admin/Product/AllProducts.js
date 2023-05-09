import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { getProductByCount, removeProduct } from "../../../functions/product";
import { Spin, message } from "antd";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => ({...state}))

  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(100)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        message.error(err.respons.data?.message);
      });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);

  const removeHandler = async(slug) => {
    try {
      setLoading(true);
      const res = await removeProduct(slug, user.token);
      setLoading(false);

      toast.warning(`${res.data.title} is Deleted`);
      loadAllProducts();
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <Spin spinning={loading}>
            <h4>All Products</h4>
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 pb-3">
                  <AdminProductCard product={product} removeHandler={removeHandler} slug={product.slug}/>
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
