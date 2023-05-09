import React , {useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState } from "react";
import { Modal, Select, Spin, message } from "antd";
import { createProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "PS5 Console",
  description: "Gaming console",
  price: "60000",
  categories: [],
  category: null,
  subs: [],
  shipping: "Yes",
  quantity: "100",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Sony", "Microsoft", "Nintendo", "Nvidia", "Sega"],
  color: "White",
  brand: "Sony",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions , setSubOptions] = useState([]);
  const [imageUploadLoading , setImageUploadLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);


  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setLoading(false);
      setValues({...values , categories: res.data});
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
    setValues({...values , subs: [] ,category: id});

    getCategorySubs(id).then((res) => {
      console.log(res.data);
      setSubOptions(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createProduct(values, user.token);
      console.log(res);
      setLoading(false);

      Modal.success({
        title: `"${res.data.title}" created`,
        afterClose() {
          history.go(0);
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
            <h4>Product Create</h4>
            <hr />
            {/* {JSON.stringify(values.images)} */}
            <div className="p-3">
              <FileUpload values={values} setValues={setValues} loading={imageUploadLoading} setLoading={setImageUploadLoading}/>
            </div>
            <ProductCreateForm
              submitHandler={submitHandler}
              inputChangeHandler={inputChangeHandler}
              onCategoryChange={categoryChangeHandler}
              setValues={setValues}
              subOptions={subOptions}
              values={values}
              loading={loading}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
