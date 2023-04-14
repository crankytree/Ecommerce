const Category = require("../models/category");
const slugify = require("slugify")

const create = async(req, res) => {
  try{
    const {name} = req.body;

    const category = await new Category({name , slug: slugify(name)}).save();

    return res.status(200).json(category);
  } catch(err){
    return res.status(400).json({message: "Create Category Failed" , err: err.message})
  }
};
const list = async(req, res) => {
  try{
    const categories = await Category.find().sort({createdAt: -1}).exec();
    return res.status(200).json(categories);
  } 
  catch(err){
    return res.status(400).json({message: "Failed to get all categories" , err: err.message})
  }
};
const read = async(req, res) => {
  try{
    const slug = req.params.slug;
    const category = await Category.findOne({slug}).exec();

    return res.status(200).json(category);
  }
  catch(err){
    return res.status(400).json({message: "Failed to get the category" , err: err.message})
  }
};
const update = async(req, res) => {
  try{
    const {name} = req.body;
    const {slug} = req.params;

    const upt = await Category.findOneAndUpdate({slug} , {name , slug: slugify(name)} , {new: true}).exec();

    return res.status(200).json(upt);
  }
  catch(err){
    return res.status(400).json({message: "Cant update" , err: err.message})
  }
};
const remove = async(req, res) => {
  try{
    const slug = req.params.slug;

    const del = await Category.findOneAndDelete({slug}).exec();

    return res.status(200).json({message: "Successfully Deleted!"});
  }
  catch(err){
    return res.status(400).json({message: "Cant Delete" , err: err.message})
  }
};

module.exports = { create, list, read, update, remove };
