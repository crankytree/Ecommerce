const admin = require("../firebase");
const user = require("../models/user");

const authCheck = async(req , res , next) => {
  try{
    
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE AUTH CHECK USER" , firebaseUser);
    req.user = firebaseUser;
    next();
    
  }catch(err){
    console.log(err);
    res.status(401).send({error: "Invalid or Expired Token"});
  }
}



 const adminCheck = async(req , res , next) => {
  try{
    const {email} = req.user;

    const adminUser = await user.findOne({email}).exec();

    if(adminUser.role !== "admin"){
      return res.status(403).json({err: "Admin Resource. Access Denied"});  
    }

    next();
  }
  catch(err){
    return res.status(500).json({err: err.message});
  }
}


module.exports = {adminCheck , authCheck}