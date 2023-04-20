const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const productControllers = require("../controllers/product")

router.post("/product" , authCheck , adminCheck , productControllers.create);
router.get("/products" , productControllers.read);


module.exports = router;