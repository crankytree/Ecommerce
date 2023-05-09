import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory } from "../../functions/category";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("SLug" ,slug);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const res = await getCategory(slug);
      console.log("Category -> ", JSON.stringify(res.data, null, 4));

      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="container">
      <Row>
        <Col span={24} className="bg-body-tertiary p-3 mt-4 mb-4">
          {loading ? (
            <h4 className="text-center mb-0 display-5">
              <LoadingOutlined />
            </h4>
          ) : (
            <h4 className="text-center mb-0 display-5">
              {products.length} Products in '{category.name}' category
            </h4>
          )}
        </Col>
      </Row>
      <Row gutter={20}>
        {products.map(p => <Col key={p._id} className="gutter-row" span={6}>
          <ProductCard product={p}/>
        </Col>)}
      </Row>
    </div>
  );
};

export default CategoryHome;
