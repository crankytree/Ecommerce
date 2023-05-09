const express = require("express");

const router = express.Router();

const {authCheck} = require("../middlewares/auth")

const userControllers = require("../controllers/user")

// router.get("/user", (req , res) => {
//   res.json({data: "Yes reached"});
// })

router.post("/user/cart" , authCheck , userControllers.userCart);
router.get("/user/cart" , authCheck , userControllers.getUserCart);
router.delete("/user/cart" , authCheck , userControllers.emptyCart);
router.post("/user/address" , authCheck , userControllers.saveAddress);

router.post("/user/order" , authCheck , userControllers.createOrder)
router.post("/user/cash-order" , authCheck , userControllers.createCashOrder)
router.get("/user/orders" , authCheck , userControllers.orders)


router.post("/user/cart/coupon" , authCheck , userControllers.applyCuoponToUserCart);

router.post("/user/wishlist" , authCheck , userControllers.addToWishlist);
router.get("/user/wishlist" , authCheck , userControllers.wishlist);
router.put("/user/wishlist/:productId" , authCheck , userControllers.removeFromWishlist);



module.exports = router;