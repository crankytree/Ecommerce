import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const changeHandler = (e) => {
    // console.log("Search change val -> ", e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("Search val on Submit", e.target.value);
    // console.log(e.target.value);
    history.push(`/shop?${text}`);
  };
  // return <Input.Search value={text} placeholder="Search" onChange={changeHandler} onSearch={submitHandler} />;
  return (
    <form className="form-inline mt-1 mb-1 d-flex align-items-center" onSubmit={submitHandler}>
      <input
        type="search"
        value={text}
        placeholder="Search"
        onChange={changeHandler}
        className="form-control mr-sm-2"
      />
      <SearchOutlined
        onClick={submitHandler}
        className="mx-1"
        style={{ cursor: "pointer", fontSize: "1.4rem" }}
      />
    </form>
  );
};

export default Search;
