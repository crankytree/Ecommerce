
const User = require("../models/user");

const createOrUpdateUser = async (req, res) => {
  const { name, email, picture } = req.user;

  const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true });

  if (user) {
    console.log("Updated User", user);
    return res.json(user);
  }

  const newUser = await new User({ name, email, picture }).save();
  console.log("New User", newUser);
  return res.json(newUser);
};

const currentUser = async (req, res) => {
  try{
    const user = await User.findOne({email: req.user.email}).exec() ;
    console.log(user);
    res.json(user);
  } catch(err){
    console.log(err);
  }
};

module.exports = { createOrUpdateUser, currentUser };
