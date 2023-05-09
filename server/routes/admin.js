const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const adminControllers = require("../controllers/admin");

router.get('/admin/orders' , authCheck ,adminCheck , adminControllers.orders);
router.put("/admin/order-status" , authCheck , adminCheck , adminControllers.orderStatus);

module.exports = router;