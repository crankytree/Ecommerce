const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    return res.status(200).json({public_id: result.public_id , url: result.secure_url});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: "Cant Upload Images" , err: err.message});
  }
};

const remove = async(req , res) => {
  try{
    let image_id = req.body.public_id;  
    await cloudinary.uploader.destroy(image_id);
    res.send("ok");
  }catch(err){
    console.log(err);
    return res.status(400).json({message: "Cant Upload Images" , err: err.message});
  }
}

module.exports = { upload , remove};  
