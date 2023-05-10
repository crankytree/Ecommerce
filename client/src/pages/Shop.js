import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchProductsByFilter, getProductByCount } from "../functions/product";
import { Checkbox, Col, Menu, Radio, Row, Slider, Spin, Transfer } from "antd";
import ProductCard from "../components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { BgColorsOutlined, BorderOuterOutlined, DollarOutlined, DownSquareOutlined, StarOutlined, TagsOutlined, TransactionOutlined } from "@ant-design/icons";
import { getCategories } from "../functions/category";
import Star from "../components/forms/Star";
import { getSubs } from "../functions/sub";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState(["Sony", "Microsoft", "Nintendo", "Nvidia", "Sega"]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [priceIsTouched , setPriceIsTouched] = useState(false);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    loadCategories();
    loadSubs();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      if(text.length !== 0)
      fetchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  useEffect(() => {
    if(priceIsTouched)
    fetchProducts({ price });
  }, [ok]);

  const loadSubs = async () => {
    try {
      setLoading(true);
      const res = await getSubs();
      setSubs(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
    }
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
    }
  };

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProductByCount(12);
      console.log("all");

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchProducts = async (arg) => {
    try {
      setLoading(true);
      const res = await fetchProductsByFilter(arg);

      // console.log("search");

      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const sliderHandler = (val) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice(val);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    if(!priceIsTouched){
      setPriceIsTouched(true);
    }

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const checkHandler = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInState = inTheState.indexOf(justChecked); // index or -1;

    if (foundInState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          className="pb-2 pt-2 mx-4"
          value={c._id}
          name="category"
          onChange={checkHandler}
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  const starClickHandler = (val) => {
    // console.log(val);
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setStar(val);
    fetchProducts({ stars: val });
  };

  const showStars = () => (
    <div className="mx-4 pb-2 pt-2">
      <Star starClick={starClickHandler} numberOfStars={5} />
      <Star starClick={starClickHandler} numberOfStars={4} />
      <Star starClick={starClickHandler} numberOfStars={3} />
      <Star starClick={starClickHandler} numberOfStars={2} />
      <Star starClick={starClickHandler} numberOfStars={1} />
    </div>
  );

  const subHandler = (s) => {
    // console.log(s);
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    setSub(s);
    fetchProducts({ sub: s });
  };

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="p-1 m-1 badge bg-secondary fs-6"
        style={{ cursor: "pointer" }}
        onClick={() => subHandler(s)}
      >
        {s.name}
      </div>
    ));

  const brandHandler = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b , i) => (
      <Radio
      key={i}
        value={b}
        name={b}
        checked={b === brand}
        className="mx-4 pb-1 pl-1 d-block"
        onChange={brandHandler}
      >
        {b}
      </Radio>
    ));

  const colorHandler = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showColors = () =>
    colors.map((c , i) => (
      <Radio
        key={i}
        value={c}
        name={c}
        checked={c === color}
        className="mx-4 pb-1 pl-1 d-block"
        onChange={colorHandler}
      >
        {c}
      </Radio>
    ));

  const shippingChangeHandler = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  }

  const showShipping = () => (
    <>
      <Checkbox
        className="mx-4 pb-1 pl-1 d-block"
        value="Yes"
        checked={shipping === "Yes"}
        onChange={shippingChangeHandler}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="mx-4 pb-1 pl-1 d-block"
        value="No"
        checked={shipping === "No"}
        onChange={shippingChangeHandler}
      >
        No
      </Checkbox>
    </>
  );

  return (
    <div className="container-fluid">
      <Row gutter={20}>
        <Col span={6} className="pt-2">
          <h4 className="fw-bold">Search/Filter Menu</h4>

          <hr />

          <Menu mode="inline" 
          // defaultOpenKeys={["1", "2", "3", "4", "5", "6" , "7"]}
          >
            <Menu.SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="mx-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={sliderHandler}
                  max="4999"
                />
              </div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div>{showCategories()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div>{showStars()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="4"
              title={
                <span className="h6">
                  <TagsOutlined /> Sub Categories
                </span>
              }
            >
              <div className="mx-4 pb-2 pt-2">{showSubs()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="5"
              title={
                <span className="h6">
                  <BorderOuterOutlined /> Brands
                </span>
              }
            >
              <div className="mb-3">{showBrands()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined /> Colours
                </span>
              }
            >
              <div className="mb-3">{showColors()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="7"
              title={
                <span className="h6">
                  <TransactionOutlined /> Shipping
                </span>
              }
            >
              <div className="mb-3">{showShipping()}</div>
            </Menu.SubMenu>
          </Menu>
        </Col>
        <Col span={18} className="pt-2">
          <Spin spinning={loading}>
            <h4 className="fw-bold">Products</h4>
            {/* {JSON.stringify(products)} */}
            {!loading && products.length < 1 && <p>No Products found...</p>}

            <Row gutter={20} className="pb-5">
              {products.map((p) => (
                <Col key={p._id} sm={24} md={8} className="gutter-row mt-3">
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
