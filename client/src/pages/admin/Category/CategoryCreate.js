import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState } from "react";
import { toast } from "react-toastify";
import { createCategory, getCategories, removeCategory } from "../../../functions/category";
import { useSelector } from "react-redux";
import { Popconfirm, Spin } from "antd";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setLoading(false);
      setCategories(res.data);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createCategory({ name }, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
      loadCategories();
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  };

  const removeHandler = async(slug) => {
    try{
      setLoading(true);
      const res = await removeCategory(slug , user.token);
      setLoading(false);

      toast.success(res.data.message)
      loadCategories();
    }
    catch(err){
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  }

  const categoryForm = () => {
    return (
      <>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
              disabled={loading}
            ></input>
          </div>

          <button className="btn btn-primary" disabled={loading}>
            Submit
          </button>
        </form>
      </>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <Spin spinning={loading}>
            <h4>Create Category</h4>
            {categoryForm()}
            <hr />
            {categories.map((c) => {
              return (
                <div className="alert alert-secondary" key={c._id}>
                  {c.name}
                  <span className="btn btn-sm float-end">
                    <Popconfirm title="Delete this Category" onConfirm={async() => await removeHandler(c.slug)}>
                      <DeleteOutlined className="text-danger" />
                    </Popconfirm>
                  </span>
                  <Link to={`/admin/category/${c.slug}`}>
                    <span className="btn btn-sm float-end">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
