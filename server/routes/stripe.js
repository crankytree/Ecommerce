const express = require("express");
const router = express.Router();

const stripeControllers = require("../controllers/stripe");

const {authCheck} = require("../middlewares/auth");

router.post("/create-payment-intent" , authCheck , stripeControllers.createPaymentIntent);

module.exports = router;