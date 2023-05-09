const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueId = require("uniqueid");

const userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    let deleteExistingCart = await Cart.findOneAndDelete({ orderedBy: user._id }).exec();

    // if(deleteExistingCart){
    //   console.log("Deleted: " , deleteExistingCart);
    // }

    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;

      let { price } = await Product.findById(cart[i]._id).select("price").exec();

      object.price = price;

      products.push(object);
    }

    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderedBy: user._id,
    }).save();

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Cant add To cart", err: err.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    let cart = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title price totalAfterDiscount")
      .exec();

    const { products, cartTotal, totalAfterDiscount } = cart;

    res.json({ products, cartTotal, totalAfterDiscount });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Cant get user Cart", err: err.message });
  }
};

const emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

    res.json(cart);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Empty Cart failed!", err: err.message });
  }
};

const saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    ).exec();

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Save Address failed!", err: err.message });
  }
};

const applyCuoponToUserCart = async (req, res) => {
  try {
    const { coupon } = req.body;

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();

    if (validCoupon == null) {
      return res.json({ message: "Invalid Coupon" });
    }

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);

    await Cart.findOneAndUpdate({ orderedBy: user._id }, { totalAfterDiscount }, { new: true });

    res.json(totalAfterDiscount);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Cant verify coupon!", err: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

    let newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();

    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOption, { new: true });
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Create New Order failed", err: err.message });
  }
};

const orders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    const userOrders = await Order.find({ orderedBy: user._id })
      .populate("products.product")
      .exec();

    res.json(userOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Can't get user orders", err: err.message });
  }
};

const wishlist = async (req, res) => {
  try {
    const list = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist")
      .exec();

    res.json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get the wish list", err: err.message });
  }
};
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User
      .findOneAndUpdate(
        { email: req.user.email },
        { $pull: { wishlist: productId } },
        { new: true }
      )
      .exec();

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to remove from wish list", err: err.message });
  }
};
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User
      .findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { wishlist: productId } },
        { new: true }
      )
      .exec();

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add to wish list", err: err.message });
  }
};

const createCashOrder = async (req, res) => {
  try {
    const { cod , couponApplied } = req.body;

    if(!cod) return res.status(400).json({message: "Create Cash order failed"})

    const user = await User.findOne({ email: req.user.email }).exec();

    let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

    let finalAmount = 0;


    if(couponApplied && userCart.totalAfterDiscount){
      finalAmount = Math.round(userCart.totalAfterDiscount * 100);
    }
    else{
      finalAmount = Math.round(userCart.cartTotal * 100);
    }

    const id = uniqueId();
    console.log(id);

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqueId(),
        amount: finalAmount,
        currency: "usd",
        status: "Cash on Delivery",
        created: Date.now(),
        payment_method_types: ["cash"],
      },
      orderedBy: user._id,
      orderStatus: "Cash On Delivery"
    }).save();

    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    let updated = await Product.bulkWrite(bulkOption, { new: true });
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Create New Order failed", err: err.message });
  }
};

module.exports = {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCuoponToUserCart,
  createOrder,
  orders,
  wishlist,
  addToWishlist,
  removeFromWishlist,
  createCashOrder,
};
