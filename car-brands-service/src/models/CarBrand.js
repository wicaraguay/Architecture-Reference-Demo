// src/models/CarBrand.js
const mongoose = require('mongoose');

const CarBrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  established: { type: Number },
  models: [{ type: String }]
});

module.exports = mongoose.model('CarBrand', CarBrandSchema);
