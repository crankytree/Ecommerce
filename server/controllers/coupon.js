const Coupon = require("../models/coupon")

const create = async(req , res) => {
  try{
    const {name , expiry , discount} = req.body.coupon;
    res.json(await new Coupon({name , expiry , discount}).save());
  } catch(err) {
    console.log(err);
    res.status(400).json({message: "Create coupon failed!" , err:err.message})
  }
}
const remove = async(req , res) => {
  try{
    
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch(err) {
    console.log(err);
    res.status(400).json({message: "Coupon delete failed!" , err:err.message})
  }
}
const list = async(req , res) => {
  try{
    res.json(await Coupon.find({}).sort({createdAt: -1}).exec());
  } catch(err) {
    console.log(err);
    res.status(400).json({message: "Create coupon failed!" , err:err.message})
  }
}

module.exports = {create , list , remove};