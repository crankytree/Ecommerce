const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify")

const create = async(req, res) => {
  try{
    const {name , parent} = req.body;

    const sub = await new Sub({name , parent , slug: slugify(name)}).save();

    return res.status(200).json(sub);
  } catch(err){
    return res.status(400).json({message: "Create Sub Category Failed" , err: err.message})
  }
};
const list = async(req, res) => {
  try{
    const subs = await Sub.find().sort({createdAt: -1}).exec();
    return res.status(200).json(subs);
  } 
  catch(err){
    return res.status(400).json({message: "Failed to get all sub categories" , err: err.message})
  }
};
const read = async(req, res) => {
  try{
    const slug = req.params.slug;
    const sub = await Sub.findOne({slug}).exec();

    const products = await Product.find({subs: sub}).populate("category").exec();


    return res.status(200).json({sub , products});
  }
  catch(err){
    return res.status(400).json({message: "Failed to get the sub category" , err: err.message})
  }
};
const update = async(req, res) => {
  try{
    const {name , parent} = req.body;
    const {slug} = req.params;

    const upt = await Sub.findOneAndUpdate({slug} , {name , parent , slug: slugify(name)} , {new: true}).exec();

    return res.status(200).json(upt);
  }
  catch(err){
    return res.status(400).json({message: "Cant update" , err: err.message})
  }
};
const remove = async(req, res) => {
  try{
    const slug = req.params.slug;

    const del = await Sub.findOneAndDelete({slug}).exec();

    return res.status(200).json({message: "Successfully Deleted!"});
  }
  catch(err){
    return res.status(400).json({message: "Cant Delete" , err: err.message})
  }
};

module.exports = { create, list, read, update, remove };
