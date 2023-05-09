import React from 'react'

const CategoryForm = (props) => {

  const {submitHandler , name , setName , loading} = props;
  return (
    <form onSubmit={submitHandler}>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input
        className="form-control"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        required
        disabled={loading}
      ></input>
    </div>

    <button className="btn btn-primary" disabled={loading}>
      Submit
    </button>
  </form>
  )
}

export default CategoryForm