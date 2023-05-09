import React from "react";
import { Card, Skeleton, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ps5 from "../../images/ps5.jpg";

import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const ProductCard = (props) => {
  const { product } = props;

  const { title, images, description, slug, price } = product;

  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

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
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet...</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length > 0 ? images[0].url : ps5}
            style={{ height: "200px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning d-flex justify-content-center align-items-center" />
            <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={addToCartHandler} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger d-flex justify-content-center align-items-center" />
              <br /> {product.quantity < 1 ? <p className="text-danger">Out of stock</p> : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${
            description && description.substring(0, 40) + description.length > 40 ? "..." : ""
          }`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
