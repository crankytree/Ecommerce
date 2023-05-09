import React, { useEffect, useState } from "react";
import {getProductCount, getProducts } from "../../functions/product";
import { toast } from "react-toastify";
import { Pagination , Row , Col } from "antd";

import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    loadProductCount();
  }, []);

  const loadProductCount = async () => {
    try {
      const res = await getProductCount();
      setProductsCount(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message);
    }
  };

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts("sold" , "desc" , 3 , page);

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data?.message);
    }
  };
  return (
    <>

      <div className="container">
        { loading ? <LoadingCard count={10}/> :
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

        }
        
      </div>

      <Row>
        <Col span={8} offset={8} className="text-center p-3 pt-5">
          <Pagination
            current={page}
            pageSize={3}
            total={productsCount}
            onChange={(val) => setPage(val)}
          />
        </Col>
      </Row>
    </>
  );
};

export default BestSellers;
