const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const productControllers = require("../controllers/product")

router.post("/product" , authCheck , adminCheck , productControllers.create);
router.get("/products/total" , productControllers.productsCount);
router.get("/products/:count" , productControllers.listAll);
router.delete("/product/:slug" , authCheck , adminCheck , productControllers.remove);
router.get("/product/:slug" , productControllers.read);
router.put("/product/:slug" , authCheck , adminCheck , productControllers.update);

router.post("/products" , productControllers.list);

//ratings

router.put("/product/star/:productId" , authCheck , productControllers.productStart);
router.get("/product/related/:productId" , productControllers.listRelated)

router.post("/search/filters" , productControllers.searchFilters);


module.exports = router;