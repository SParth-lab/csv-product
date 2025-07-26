const Product = require("../models/Product");
const Variant = require("../models/Variant");



const productController = {
  validator: async (req, res, next) => {
    console.log("🚀 ~ productController ~ req:", req)
    const { productData, productType} = req.body;
    if (!productData || !productType) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (productType !== "product" && productType !== "variant") {
      return res.status(400).json({ message: "Invalid product type (product or variant)" });
    }
    next();
  },
  controller: async (req, res) => {
try {
  const { productData, productType} = req.body;
  if (productType === "product") {
    // here productData is array of objects
    const products = await Product.insertMany(productData);
    if (!products) {
      return res.status(400).json({ message: "Products not found" });
    }
    return res.status(200).json({ message: "Products created successfully", products });
  }
  if (productType === "variant") {
    // here productData is array of objects
    const variants = await Variant.insertMany(productData);
    if (!variants) {
      return res.status(400).json({ message: "Variants not found" });
    }
    return res.status(200).json({ message: "Variants created successfully", variants });
  }
} catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error check a csv file" });
}
  }
};


const getProductController = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    try {
      const { productId, searchTerm } = req.query;
      const criteria = {};
      if (productId) {
        criteria.data__id = productId;
      }
      if (searchTerm) {
        criteria.data__name = { $regex: searchTerm, $options: "i" };
      }

      const product = await Product.find(criteria);
      return res.status(200).json({ message: "Product fetched successfully", product: product || [] });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}


const getVariantController = {
  validator: async (req, res, next) => {
    next();
  },
  controller: async (req, res) => {
    try {
      const { variantId, searchTerm } = req.query;
      const criteria = {};
      if (variantId) {
        criteria.data__verients__product_id = parseInt(variantId);
      }
      if (searchTerm) {
        criteria.data__variant_name = { $regex: searchTerm, $options: "i" };
      }
      const variant = await Variant.find(criteria);
      return res.status(200).json({ message: "Variant fetched successfully", variant: variant || [] });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = { productController, getProductController, getVariantController };