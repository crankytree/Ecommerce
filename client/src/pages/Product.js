import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, productSart , getRelated } from "../functions/product";
import { Row, Col } from "antd";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard"

const Product = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState(0);
  const [related , setRelated] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  // console.log(product);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );

      if (existingRatingObject) {
        // console.log(existingRatingObject);
        setStar(existingRatingObject.star);
      }
    }
  } , [user , product.ratings]);

  const loadSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct(slug);

      const res2 = await getRelated(res.data._id);

      setProduct(res.data);
      setRelated(res2.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data?.message);
    }
  };

  const starChangeHandler = async (newStar, name) => {
    setStar(newStar);

    try {
      const res = await productSart(name, newStar, user.token);
      console.log(res.data);
      loadSingleProduct();
    } catch (err) {
      toast.error(err.response.data?.message);
    }
  };
  return (
    <div className="container-fluid">
      <Row className="pt-4" gutter={20}>
        <SingleProduct product={product} onStarChange={starChangeHandler} star={star} />
      </Row>

      <Row>
        <Col span={24} className="text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          {/* {JSON.stringify(related)} */}
          <hr />
        </Col>
      </Row>

      <Row className="pb-5" gutter={20}>
        {related.length > 0 ? related.map((r) => (
          <Col key={r._id} span={6} className="gutter-row">
            <ProductCard product={r}/>
          </Col>
        )) : <Col span={24} className="text-center p-3">No Products Found</Col>}
      </Row>
    </div>
  );
};

export default Product;
