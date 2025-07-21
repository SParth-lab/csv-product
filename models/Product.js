const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  data__id: String,
  data__name: String,
  data__color: String,
  data__size: String,
  data__storage: String,
  data__selling_price: String,
  data__mrp: String,
  data__features: String,
  data__img1: String,
  data__img2: String,
  data__img3: String,
  data__img4: String,
  data__img5: String
});

module.exports = mongoose.model("Product", productSchema);
