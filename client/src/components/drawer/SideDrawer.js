import { Drawer, Row, Col } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ps5 from "../../images/ps5.jpg";

const SideDrawer = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "80px",
    objectFit: "cover",
  };

  return (
    <Drawer
      title={`Cart / ${cart.length} Products`}
      placement="right"
      onClose={() => dispatch({ type: "SET_VISIBLE", payload: false })}
      visible={drawer}
      className="text-center"
    >
      {cart.map((p) => (
        <Row key={p._id}>
          <Col span={24}>
            {p.images[0] ? (
              <img src={p.images[0].url} style={imageStyle}></img>
            ) : (
              <img src={ps5} style={imageStyle}></img>
            )}
            <p className="text-center bg-secondary text-light">
              {p.title} x {p.count}
            </p>
          </Col>
        </Row>
      ))}

      <Link to="/cart">
        <button
          className="text-center btn btn-primary btn-raised bth-block"
          onClick={() => dispatch({ type: "SET_VISIBLE", payload: false })}
        >
          GO TO CART
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
