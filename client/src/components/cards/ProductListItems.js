import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategoryById } from "../../functions/category";
import { useState } from "react";

const ProductListItems = (props) => {
  const { product } = props;

  const { price, category, subs , shipping , color , brand , quantity , sold} = product;

  const [cat, setCat] = useState({});

  useEffect(() => {
    if (category) {
      getCategory(category);
    }
  }, [category]);

  const getCategory = async (id) => {
    try {
      const res = await getCategoryById(id);
      // console.log(res);
      setCat(res.data);
    } catch (err) {}
  };

  // console.log(product);
  // console.log(cat);
  return (
    <ul className="list-group">
      <li className="p-2 d-flex justify-content-between align-items-center">
        Price
        <span className="">$ {price}</span>
      </li>
      {cat && (
        <li className="p-2 d-flex justify-content-between align-items-center">
          Category
          <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
        </li>
      )}

      {subs && (
        <li className="p-2 d-flex justify-content-between align-items-center">
          Sub Categories
          {subs.map((s) => (
            <Link key={s._id} to={`/sub/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="p-2 d-flex justify-content-between align-items-center">
        Shiping
        <span className="">{shipping}</span>
      </li>
      <li className="p-2 d-flex justify-content-between align-items-center">
        Colour
        <span className="">{color}</span>
      </li>
      <li className="p-2 d-flex justify-content-between align-items-center">
        Brand
        <span className="">{brand}</span>
      </li>
      <li className="p-2 d-flex justify-content-between align-items-center">
        Available
        <span className="">{quantity}</span>
      </li>
      <li className="p-2 d-flex justify-content-between align-items-center">
        Sold
        <span className="">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
