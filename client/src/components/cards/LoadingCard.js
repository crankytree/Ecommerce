import { Row, Skeleton, Col, Card } from "antd";
import React from "react";

const LoadingCard = (props) => {
  const { count } = props;

  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Col span={8} className="gutter-row" key={i}>
          <Card>
            <Skeleton active></Skeleton>
          </Card>
        </Col>
      );
    }

    return totalCards;
  };
  return <Row gutter={[16 , 16]}>{cards()}</Row>;
};

export default LoadingCard;
