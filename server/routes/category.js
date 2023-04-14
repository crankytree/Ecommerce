const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const categoryControllers = require("../controllers/category")

router.post("/category" , authCheck , adminCheck , categoryControllers.create);
router.get("/categories" , categoryControllers.list);
router.get("/category/:slug" , categoryControllers.read);
router.put("/category/:slug" , authCheck , adminCheck ,categoryControllers.update);
router.delete("/category/:slug" , authCheck , adminCheck ,categoryControllers.remove);

module.exports = router;