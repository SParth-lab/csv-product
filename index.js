const express = require("express");
const cors = require("cors");
const path = require("path");
require("./config/db.config.js");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Enable CORS
app.use(cors());

// 🔧 Increase payload size limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Routes
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  return res.send("OK");
});

// 404 handler
app.use('*', function (req, res) {
  res.json({
      statusCode: 404,
      message: 'Page not found',
      data: null,
  });
});

module.exports = app;
