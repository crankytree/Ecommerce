const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is requires",
      minlength: [2 , "Category name is too short"],
      maxlength: [32 , "Category name is too big"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index:true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Category" , categorySchema);