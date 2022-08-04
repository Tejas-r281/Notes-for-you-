const express = require("express");

const app = express();




const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");


const errorMiddleware = require("./middleware/error");


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
// app.use(function(req,res,next)
// {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
//     res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS,key");
//     next();
// })
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


const user = require("./routes/userRoute");

const uplaod=require("./routes/uploadRoute");

app.use("/api/v1", user);

app.use("/api/v1",uplaod);



// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res, next) =>
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// );



app.use(errorMiddleware);

module.exports = app;