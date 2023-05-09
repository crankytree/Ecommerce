import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();

      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id} className="btn btn-outline-secondary btn-lg btn-block m-3">
        <Link className="text-decoration-none text-reset" to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <Row className="text-center">{loading ? <h4>Loading...</h4> : showCategories()}</Row>
    </div>
  );
};

export default CategoryList;
