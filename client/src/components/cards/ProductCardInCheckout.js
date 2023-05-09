import React from "react";
import ModalImage from "react-modal-image";
import ps5 from "../../images/ps5.jpg";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckout = (props) => {
  const { p } = props;

  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const dispatch = useDispatch();

  const colorChangeHandler = (val) => {
    if (typeof window !== undefined) {
      let cart = [];
      const cartExist = localStorage.getItem("cart");

      if (cartExist) {
        cart = JSON.parse(cartExist);
      }

      cart.map((product) => {
        if (product._id === p._id) {
          product.color = val;
        }

        return product;
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  const quantityChangeHandler = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    console.log(p.quantity);

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== undefined) {
      const cartExist = localStorage.getItem("cart");

      if (cartExist) {
        cart = JSON.parse(cartExist);
      }

      cart.map((product) => {
        if (product._id === p._id) {
          product.count = count;
        }
        return product;
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  const removeHandler = () => {
    let cart = [];
    if (typeof window !== undefined) {
      const cartExist = localStorage.getItem("cart");

      if (cartExist) {
        cart = JSON.parse(cartExist);
      }

      cart = cart.filter((product) => product._id !== p._id);

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={ps5} large={ps5} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>$ {p.price}</td>
        <td>{p.brand}</td>
        <td>
          <Select
            onChange={colorChangeHandler}
            name="color"
            placeholder="Select"
            defaultValue={p.color}
            style={{ width: "6rem" }}
          >
            {colors.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            onChange={quantityChangeHandler}
            value={p.count}
          ></input>
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined className="text-danger pointer" onClick={removeHandler} />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
