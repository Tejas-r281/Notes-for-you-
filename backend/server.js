const app = require("./app");
var cors = require('cors');



const connectDatabase = require("./db/database");
//CORS Setting



if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
connectDatabase();


const server = app.listen(process.env.PORT || 6000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});