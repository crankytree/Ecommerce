import React from "react";
import { Input, Select, Space } from "antd";

const ProductUpdateForm = (props) => {
  const {
    submitHandler,
    inputChangeHandler,
    setValues,
    values,
    loading,
    onCategoryChange,
    arrayOfSubIds,
    setArrayOfSubIds,
    subOptions,
  } = props;

  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={submitHandler}>
      <Space direction="vertical" className="w-100">
        <div className="">
          <label>Title</label>
          <Input type="text" name="title" value={title} onChange={inputChangeHandler}></Input>
        </div>
        <div className="">
          <label>Description</label>
          <Input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={inputChangeHandler}
          ></Input>
        </div>
        <div className="">
          <label>Price</label>
          <Input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={inputChangeHandler}
          ></Input>
        </div>
        <div className="">
          <label>Shipping</label>
          <Select
            className="form-control"
            placeholder="Select Shipping"
            value={shipping}
            onChange={(val) => setValues({ ...values, shipping: val })}
          >
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        </div>
        <div className="">
          <label>Quantity</label>
          <Input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={inputChangeHandler}
          ></Input>
        </div>
        <div className="">
          <label>Color</label>
          <Select
            className="form-control"
            placeholder="Select Color"
            value={color}
            onChange={(val) => setValues({ ...values, color: val })}
          >
            {colors.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="">
          <label>Brand</label>
          <Select
            className="form-control"
            placeholder="Select Brand"
            value={brand}
            onChange={(val) => setValues({ ...values, brand: val })}
          >
            {brands.map((b) => (
              <Select.Option key={b} value={b}>
                {b}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <label>Category</label>
          <Select
            placeholder="Select Category"
            className="w-100"
            value={category}
            onChange={(id) => onCategoryChange(id)}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
        </div>
        
        <div>
            <label>Sub Categories</label>

            <Select
              mode="multiple"
              className="w-100"
              placeholder="Select Sub Categories"
              value={arrayOfSubIds}
              onChange={(val) => setArrayOfSubIds(val)}
            >
              {subOptions.map((s) => (
                <Select.Option key={s._id} value={s._id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </div>

        <button className="btn btn-primary mt-4" disabled={loading}>
          Submit
        </button>
      </Space>
    </form>
  );
};

export default ProductUpdateForm;
