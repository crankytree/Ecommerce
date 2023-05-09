import { StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RatingModal = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();

  const modalHandler = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };
  return (
    <>
      <div onClick={modalHandler}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave Rating" : "Login to leave rating"}
      </div>

      <Modal
        title="Leave your Rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {props.children}
      </Modal>
    </>
  );
};

export default RatingModal;
