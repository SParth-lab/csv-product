const express = require("express");
const router = express.Router();
// const { getProducts, getVariants } = require("../controllers/productController");
const { productController, getProductController, getVariantController } = require("../controllers/product-controller");

router.post("/upload", productController.validator, productController.controller);
router.get("/products", getProductController.validator, getProductController.controller);
router.get("/variants", getVariantController.validator, getVariantController.controller);

module.exports = router;
