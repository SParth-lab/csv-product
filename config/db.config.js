const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("🚀 ~ Database connected successfully");
    })
    .catch((err) => {
        console.error(err)
    })