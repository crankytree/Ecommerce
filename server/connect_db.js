const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

const connect = async() => {
  try{
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log("Connected to database " , conn.connection.host);
  } catch(err){
    console.log(`Error: ${err}`);
  }
}

module.exports = connect;