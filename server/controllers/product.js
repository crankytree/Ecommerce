const Product = require("../models/product");
const slugify = require("slugify");


const create = async(req , res) => {
  try{
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch(err) {
    console.log(err);
    res.status(400).json({message: "Create Product Failed" , err:err.message})
  }
}

const read = async(req , res) => {
  try{
    const products = await Product.find({});
    res.json(products);
  } catch(err){
    console.log(err);
    res.status(400).json({message: "Failed to get products" , err:err.message})
  }
}

module.exports = {create , read}