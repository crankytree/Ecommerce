const express = require("express");

const router = express.Router();

const {authCheck , adminCheck} = require("../middlewares/auth")

const cloudinaryControllers = require("../controllers/cloudinary")

router.post("/upload-images" , authCheck , adminCheck , cloudinaryControllers.upload)
router.post("/remove-images" , authCheck , adminCheck , cloudinaryControllers.remove)


module.exports = router