import React, { useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState } from "react";
import { Modal, Select, Spin, message } from "antd";
import { createProduct, getProduct, updateProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: null,
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Sony", "Microsoft", "Nintendo", "Nvidia", "Sega"],
  color: "",
  brand: "",
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [arrayOfSubIds , setArrayOfSubIds] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  // console.log(slug);

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, []);

  const loadProduct = async () => {
    setLoading(true);
    const res = await getProduct(slug);
    setLoading(false);
    setValues((prev) => ({...prev , ...res.data}));

    const subs = await getCategorySubs(res.data.category);

    setSubOptions(subs.data);

    let arr = [];

    res.data.subs.forEach((sub) => {
      arr.push(sub._id);
    })

    setArrayOfSubIds((prev) => arr);
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setLoading(false);
      setValues((prev) => ({ ...prev ,  categories: res.data }));
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  const history = useHistory();

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const categoryChangeHandler = (id) => {
    // console.log(id);
    setValues({ ...values, subs: [], category: id });

    getCategorySubs(id)
      .then((res) => {
        // console.log(res.data);
        setSubOptions(res.data);

        setArrayOfSubIds([]);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      values.subs = arrayOfSubIds;
      const res = await updateProduct(slug , values, user.token);
      console.log(res);
      setLoading(false);

      Modal.success({
        title: `"${res.data.title}" updated`,
        afterClose() {
          history.push("/admin/products");
        },
      });
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      toast.error(err.response.data.err);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <Spin spinning={loading}>
            <h4>Product SubUpdate</h4>
            
            <hr />
            {/* {JSON.stringify(values.images)} */}
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                loading={imageUploadLoading}
                setLoading={setImageUploadLoading}
              />
            </div>
            <ProductUpdateForm
              submitHandler={submitHandler}
              inputChangeHandler={inputChangeHandler}
              setValues={setValues}
              values={values}
              loading={loading}
              onCategoryChange={categoryChangeHandler}
              arrayOfSubIds={arrayOfSubIds}
              setArrayOfSubIds={setArrayOfSubIds}
              subOptions={subOptions}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
