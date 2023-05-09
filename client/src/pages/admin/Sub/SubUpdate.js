import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub, removeSub } from "../../../functions/sub";
import { useSelector } from "react-redux";
import { Popconfirm, Spin, Input, Select } from "antd";
import { useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent , setParent] = useState("");

  const {slug} = useParams();
  const history = useHistory();

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = async (slug) => {
    try {
      setLoading(true);
      const res = await getCategories(slug);
      setLoading(false);
      setCategories(res.data);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };
  const loadSub = async () => {
    try {
      setLoading(true);
      const res = await getSub(slug);
      setLoading(false);
      setName(res.data.name);
      setParent(res.data.parent);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSub(slug);
  }, [slug]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateSub(slug , { name , parent }, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
      history.push("/admin/sub")
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.message);
    }
  };

 

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
                value={parent}
                onChange={(val) => setParent(val)}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <Select.Option key={c._id} value={c._id} select>
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
                    
            
           
            
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
