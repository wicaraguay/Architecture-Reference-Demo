// src/services/carService.js
const CarBrand = require('../models/CarBrand');

const CarService = {
  getAllBrands: async function(args) {
    try {
      const brands = await CarBrand.find({});
      return { brands: brands };
    } catch (err) {
      throw err;
    }
  },
  getBrandByName: async function(args) {
    try {
      const brand = await CarBrand.findOne({ name: args.name });
      if (!brand) {
        throw {
          Fault: {
            Code: { value: 'soap:Client', Subcode: { value: 'rpc:BadArguments' } },
            Reason: { Text: 'Brand not found' }
          }
        };
      }
      return { brand: brand };
    } catch (err) {
      throw err;
    }
  },
  addBrand: async function(args) {
    try {
      const newBrand = new CarBrand(args.brand);
      const savedBrand = await newBrand.save();
      return { brand: savedBrand };
    } catch (err) {
      throw err;
    }
  },
  // Puedes agregar más métodos según tus necesidades
};

module.exports = CarService;
