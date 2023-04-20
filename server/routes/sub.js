const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const categoryControllers = require("../controllers/sub")

router.post("/sub" , authCheck , adminCheck , categoryControllers.create);
router.get("/subs" , categoryControllers.list);
router.get("/sub/:slug" , categoryControllers.read);
router.put("/sub/:slug" , authCheck , adminCheck ,categoryControllers.update);
router.delete("/sub/:slug" , authCheck , adminCheck ,categoryControllers.remove);

module.exports = router;