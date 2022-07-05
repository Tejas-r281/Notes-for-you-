const app = require("./app");

const connectDatabase = require("./db/database");

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
connectDatabase();


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});