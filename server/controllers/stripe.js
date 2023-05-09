const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const createPaymentIntent = async (req, res) => {
  try {

    // console.log(req.body);
    const {couponApplied} = req.body;

    const user = await User.findOne({email: req.user.email}).exec();

    const {cartTotal , totalAfterDiscount} = await Cart.findOne({orderedBy: user._id}).exec();

    // console.log("CaRT TOTAL" , cartTotal , "DIS" , totalAfterDiscount);
    let finalAmount = 0;


    if(couponApplied && totalAfterDiscount){
      finalAmount = Math.round(totalAfterDiscount * 100);
    }
    else{
      finalAmount = Math.round(cartTotal * 100);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "usd",
      description: "Ecommerce services",
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
    }
    });


    res.send({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      totalAfterDiscount,
      payable: finalAmount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong in payment", err: err.message });
  }
};

module.exports = { createPaymentIntent };
