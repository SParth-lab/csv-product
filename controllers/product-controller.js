const Product = require("../models/Product");
const Variant = require("../models/Variant");



const productController = {
  validator: async (req, res, next) => {
    console.log("🚀 ~ productController ~ req:", req)
    const { productData, productType } = req.body;
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
      const { productData, productType } = req.body;
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

const deleteController = {
  validator: async (req, res, next) => {
    try {
      const { ids, type } = req.body;

      // Validate required fields
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          message: "IDs array is required and must not be empty"
        });
      }

      if (!type || (type !== "product" && type !== "variant")) {
        return res.status(400).json({
          message: "Type is required and must be either 'product' or 'variant'"
        });
      }

      next();
    } catch (error) {
      console.error("Delete validator error:", error);
      return res.status(500).json({
        message: "Validation error occurred"
      });
    }
  },

  controller: async (req, res) => {
    try {
      const { ids, type } = req.body;

      let deletedItems;
      let deletedCount = 0;

      if (type === "product") {
        // Delete products by _id
        const result = await Product.deleteMany({
          _id: { $in: ids }
        });

        deletedCount = result.deletedCount;
        deletedItems = { products: deletedCount };

      } else if (type === "variant") {
        // Delete variants by _id
        const result = await Variant.deleteMany({
          _id: { $in: ids }
        });

        deletedCount = result.deletedCount;
        deletedItems = { variants: deletedCount };
      }

      if (deletedCount === 0) {
        return res.status(404).json({
          message: `No ${type}s found with the provided IDs`,
          deletedItems
        });
      }

      return res.status(200).json({
        message: `${deletedCount} ${type}${deletedCount > 1 ? 's' : ''} deleted successfully`,
        deletedItems
      });

    } catch (error) {
      console.error("Delete controller error:", error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(400).json({
          message: "Invalid ID format provided"
        });
      }

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: "Validation error occurred during deletion"
        });
      }

      return res.status(500).json({
        message: "Internal server error occurred during deletion"
      });
    }
  }
};

module.exports = { productController, getProductController, getVariantController, deleteController };