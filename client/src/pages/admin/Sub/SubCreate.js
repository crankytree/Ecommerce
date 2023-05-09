import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { useSelector } from "react-redux";
import { Popconfirm, Spin, Input, Select } from "antd";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category , setCatogory] = useState("");

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
  const loadSubs = async () => {
    try {
      setLoading(true);
      const res = await getSubs();
      setLoading(false);
      setSubs(res.data);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createSub({ name , parent: category }, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
      loadSubs();
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  };

  const removeHandler = async (slug) => {
    try {
      setLoading(true);
      const res = await removeSub(slug, user.token);
      setLoading(false);

      toast.success(res.data.message);
      loadSubs();
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <Spin spinning={loading}>
            <h4>Create Sub Category</h4>

            <div className="form-group">
              <label>Parent Category</label>
              <Select
                placeholder="Select Category"
                className="form-control"
                onChange={(val) => setCatogory(val)}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <Select.Option key={c._id} value={c._id}>
                      {c.name}
                    </Select.Option>
                  ))}
              </Select>
            </div>
            <CategoryForm
              submitHandler={submitHandler}
              name={name}
              setName={setName}
              loading={loading}
            />
            <hr />
            <LocalSearch setKeyword={setKeyword} keyword={keyword} />
            
            {subs.filter(searched(keyword)).map((s) => {
              return (
                <div className="alert alert-secondary" key={s._id}>
                  {s.name}
                  <span className="btn btn-sm float-end">
                    <Popconfirm
                      title="Delete this Category"
                      onConfirm={async () => await removeHandler(s.slug)}
                    >
                      <DeleteOutlined className="text-danger" />
                    </Popconfirm>
                  </span>
                  <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
