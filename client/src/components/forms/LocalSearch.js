import React from "react";
import { Input } from "antd";

const LocalSearch = (props) => {

  const {setKeyword , keyword} = props;

  const searchChangeHandler = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  }
  return (
    <div className="pt-2 pb-4">
      <Input.Search
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={searchChangeHandler}
      />
    </div>
  );
};

export default LocalSearch;
