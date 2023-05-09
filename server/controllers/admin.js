const Order = require("../models/order");

const orders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort("-createdAt").populate("products.product").exec();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Can't get orders", err: err.message });
  }
};

const orderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const updated = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true }).exec();

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order Status update failed", err: err.message });
  }
};

module.exports = { orders, orderStatus };
