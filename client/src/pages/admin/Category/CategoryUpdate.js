import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../functions/category";
import { useSelector } from "react-redux";
import { Popconfirm, Spin } from "antd";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategory = async (slug) => {
    try {
      setLoading(true);
      const res = await getCategory(slug);
      setLoading(false);
      setName(res.data.name);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory(params.slug);
  }, [params.slug]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateCategory(params.slug, { name }, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${params.slug}" updated to "${res.data.name}"`);
      history.push("/admin/category");
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  };

  // const removeHandler = async(slug) => {
  //   try{
  //     setLoading(true);
  //     const res = await removeCategory(slug , user.token);
  //     setLoading(false);

  //     toast.success(res.data.message)
  //     loadCategories();
  //   }
  //   catch(err){
  //     console.log(err.response);
  //     setLoading(false);
  //     if (err.response.status === 400) toast.error(err.response.data.message);
  //   }
  // }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <Spin spinning={loading}>
            <h4>Update Category</h4>
            <CategoryForm
              submitHandler={submitHandler}
              name={name}
              setName={setName}
              loading={loading}
            />
            <hr />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
