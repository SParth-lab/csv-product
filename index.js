const express = require("express");
const cors = require("cors");
const path = require("path");
require("./config/db.config.js");
const productRoutes = require("./routes/productRoutes");

const app = express()
app.use(cors())
app.use(express.json());


app.use("/api", productRoutes);

app.get("/", (req, res) => {
  return res.send("OK")
});

app.use('*', function (req, res) {
  res.json({
      statusCode: 404,
      message: 'Page not found',
      data: null,
  });
});

module.exports = app;