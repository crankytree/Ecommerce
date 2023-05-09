const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const couponControllers = require("../controllers/coupon")

router.post("/coupon" , authCheck , adminCheck , couponControllers.create);
router.get("/coupons" , couponControllers.list);
router.delete("/coupon/:couponId" , authCheck , adminCheck , couponControllers.remove);

module.exports = router;