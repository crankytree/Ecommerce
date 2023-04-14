const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs");
require("dotenv").config()


const connect_to_database = require("./connect_db");

//app
const app = express();

//db
connect_to_database();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());


//route middlewares
fs.readdirSync("./routes").map((r) => app.use("/api" , require("./routes/" + r)));

//port
const port = process.env.PORT;
app.listen(port , () => console.log(`server is up and running on port ${port}`))