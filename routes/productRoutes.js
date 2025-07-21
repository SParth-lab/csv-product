const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadCSV, getProducts, getVariants } = require("../controllers/productController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", (req, res, next) => {
  // Allow CORS preflight for this route
  console.log("🚀 ~ router.post ~ req:", req)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}, upload.single("file"), uploadCSV);
router.get("/products", getProducts);
router.get("/variants/:productId", getVariants);

module.exports = router;
