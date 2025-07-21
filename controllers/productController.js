const csv = require("csvtojson");
const Product = require("../models/Product");
const Variant = require("../models/Variant");
const fs = require("fs");

exports.uploadCSV = async (req, res) => {
  console.log(req.body);
  const { type } = req.body;
  const filePath = req.file?.path;

  if (!filePath || !type) {
    return res.status(400).json({ message: "Missing file or type" });
  }

  try {
    const jsonArray = await csv().fromFile(filePath);

    if (type === "product") {
      await Product.insertMany(jsonArray);
    } else if (type === "variant") {
      await Variant.insertMany(jsonArray);
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    fs.unlinkSync(filePath);
    res.json({ message: "Upload successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const {
    minSellingPrice,
    maxSellingPrice,
    minMrp,
    maxMrp,
    name,
    color,
  } = req.query;

  const filter = {};

  if (minSellingPrice || maxSellingPrice) {
    filter.data__selling_price = {};
    if (minSellingPrice) filter.data__selling_price.$gte = Number(minSellingPrice);
    if (maxSellingPrice) filter.data__selling_price.$lte = Number(maxSellingPrice);
  }

  if (minMrp || maxMrp) {
    filter.data__mrp = {};
    if (minMrp) filter.data__mrp.$gte = Number(minMrp);
    if (maxMrp) filter.data__mrp.$lte = Number(maxMrp);
  }

  if (name) filter.data__name = { $regex: name, $options: "i" };
  if (color) filter.data__color = { $regex: color, $options: "i" };

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVariants = async (req, res) => {
  const { productId } = req.params;
  try {
    const variants = await Variant.find({
      data__verients__product_id: productId,
    });
    res.json(variants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};