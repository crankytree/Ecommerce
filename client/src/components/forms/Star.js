import React from "react";
import StarRatings from "react-star-ratings";

const Star = (props) => {
  const { starClick, numberOfStars } = props;
  return (
    <div className="mt-2 mb-2">
    <StarRatings
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
      />
      </div>
  );
};

export default Star;
