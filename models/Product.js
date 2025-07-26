const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  data__id: {
    type: Number,
    required: true,
    unique: true,
  },
  data__name: {
    type: String,
    required: true,
    trim: true,
  },
  data__color: {
    type: String,
    default: "Unknown",
  },
  data__size: {
    type: String,
  },
  data__storage: {
    type: String,
  },
  data__selling_price: {
    type: Number,
    required: true,
    min: 0,
  },
  data__mrp: {
    type: Number,
    required: true,
    min: 0,
  },
  data__features: {
    type: String,
    default: "",
  },
  data__img1: {
    type: String,
    required: false,
  },
  data__img2: {
    type: String,
  },
  data__img3: {
    type: String,
  },
  data__img4: {
    type: String,
  },
  data__img5: {
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

module.exports = mongoose.model("Product", productSchema);
