import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Card, Col, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ps5 from "../../images/ps5.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../functions/rating";
import _, { uniq } from "lodash";
import { toast } from "react-toastify";
import { addToWishlist } from "../../functions/user";

const { TabPane } = Tabs;

const SingleProduct = (props) => {
  const { product, star, onStarChange } = props;

  const {user} = useSelector(state => state);
  const history = useHistory();

  const { _id, title, description, images, slug } = product;

  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Add to Cart");

  const addToCartHandler = () => {
    let cart = [];
    if (typeof window !== undefined) {
      const cartExist = localStorage.getItem("cart");
      if (cartExist) {
        cart = JSON.parse(cartExist);
      }

      cart.push({ ...product, count: 1 });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));

      setTooltip("Added");

      dispatch({ type: "ADD_TO_CART", payload: unique });
      dispatch({ type: "SET_VISIBLE", payload: true });
    }
  };

  const addToWishlistHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await addToWishlist(product._id , user.token); 
      toast.success("Added to wishlist");

      history.push("/user/wishlist");
    }catch(err){
      console.log(err);
      toast.error(err.response.data?.message);
    }
  }
  return (
    <>
      <Col span={14} className="gutter-row">
        {images && images.length > 0 ? (
          <Carousel autoPlay showArrows={true} infiniteLoop>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card cover={<img src={ps5} className="card-image" />} />
        )}

        <Tabs>
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on XXXX XXXX to know more about this product.
          </TabPane>
        </Tabs>
      </Col>
      <Col span={10} className="gutter-row">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet...</div>
        )}
        <Card
          actions={[
            // <div className="text-center">
            //   <ShoppingCartOutlined className="text-success" /> <br /> Add to Cart
            // </div>,
            <Tooltip title={tooltip}>
              <a onClick={addToCartHandler}>
                <ShoppingCartOutlined className="text-success" />
                <br /> Add to Cart
              </a>
            </Tooltip>,
            <a onClick={addToWishlistHandler}>
              <HeartOutlined className="text-info" /> <br /> Add to WishList
            </a>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarChange}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          {/* <Meta title={title} description={description} /> */}
          <ProductListItems product={product} />
        </Card>
      </Col>
    </>
  );
};

export default SingleProduct;
