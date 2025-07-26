const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  data__verients__id: {
    type: Number,
    required: true,
  },
  data__verients__product_id: {
    type: Number,
    required: true,
  },
  data__verients__name: {
    type: String,
    required: true,
    trim: true,
  },
  data__verients__color: {
    type: String,
    default: "Unknown",
  },
  data__verients__size: {
    type: String,
  },
  data__verients__storage: {
    type: String,
  },
  data__verients__selling_price: {
    type: Number,
    required: true,
    min: 0,
  },
  data__verients__mrp: {
    type: Number,
    required: true,
    min: 0,
  },
  data__verients__features: {
    type: String,
    default: "",
  },
  data__verients__img1: {
    type: String,
    required: false,
  },
  data__verients__img2: {
    type: String,
  },
  data__verients__img3: {
    type: String,
  },
  data__verients__img4: {
    type: String,
  },
  data__verients__img5: {
    type: String,
  },
  data__features_object: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Variant", variantSchema);