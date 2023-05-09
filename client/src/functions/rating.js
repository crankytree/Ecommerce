import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if(p && p.ratings){
    let ratingsArray = p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.forEach((r) => total.push(r.star));

    let totalReduced = total.reduce((p , n) => p + n , 0);
    // console.log("total reduced -> " , totalReduced);

    let highest = length * 5;
    // console.log("highest -> " , highest);

    let result = (totalReduced * 5) / highest;
    // console.log("average -> " , result);

    return (
      <div className="text-center pb-3 align-items-center">
        <span>
          <StarRating starDimension="20px" starSpacing="2px" starRatedColor="red" rating={result} editing={false}/>({p.ratings.length})
        </span>

      </div>

    )
  }
}