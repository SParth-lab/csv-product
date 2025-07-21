const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  data__verients__id: String,
  data__verients__product_id: String,
  data__verients__name: String,
  data__verients__color: String,
  data__verients__size: String,
  data__verients__storage: String,
  data__verients__selling_price: String,
  data__verients__mrp: String,
  data__verients__features: String,
  data__verients__img1: String,
  data__verients__img2: String,
  data__verients__img3: String,
  data__verients__img4: String,
  data__verients__img5: String
});

module.exports = mongoose.model("Variant", variantSchema);