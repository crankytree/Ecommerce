import React from "react";
import { Card, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import ps5 from "../../images/ps5.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = (props) => {
  const { product, removeHandler, slug } = props;
  const { title, description, images } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length > 0 ? images[0].url : ps5}
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`product/${slug}`}>
        
        <EditOutlined className="text-warning d-flex justify-content-center align-items-center" />
        </Link>,
        <Popconfirm title="Delete this Product" onConfirm={async () => await removeHandler(slug)}>
          <DeleteOutlined className="text-danger d-flex justify-content-center align-items-center" />
        </Popconfirm>,
      ]}
    >
      <Meta
        title={title}
        description={`${
          description && description.substring(0, 40) + description.length > 40 ? "..." : ""
        }`}
      />
    </Card>
  );
};

export default AdminProductCard;
