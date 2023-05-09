import React from "react";

import JumboTron from "../components/cards/JumboTron";

import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="bg-body-tertiary p-5 text-danger display-3 fw-bold text-center">
        <JumboTron text={["New Arrivals", "Latest Products", "Best Sellers"]} />
      </div>
      <div className="bg-body-tertiary mt-5 mb-5">
        <h4 className="text-center p-3 display-4">New Arrivals</h4>
      </div>
      <NewArrivals />
      <div className="bg-body-tertiary mt-5 mb-5">
        <h4 className="text-center p-3 display-4">Best Sellers</h4>
      </div>
      <BestSellers />
      <div className="bg-body-tertiary mt-5 mb-5">
        <h4 className="text-center p-3 display-4">Categories</h4>
      </div>
      <CategoryList />
      <div className="bg-body-tertiary mt-5 mb-5">
        <h4 className="text-center p-3 display-4">Sub Categories</h4>
      </div>
      <SubList />
    </>
  );
};

export default Home;
