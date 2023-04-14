const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const authControllers = require("../controllers/auth")

router.post("/create-or-update-user", authCheck , authControllers.createOrUpdateUser)
router.post("/current-user", authCheck , authControllers.currentUser)
router.post("/current-admin", authCheck , adminCheck,authControllers.currentUser)

module.exports = router;