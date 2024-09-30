// src/seed.js
const mongoose = require('mongoose');
const faker = require('faker');
const CarBrand = require('./models/CarBrand');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/carservice';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conectado a MongoDB para sembrar datos');

    // Limpiar la colección existente
    await CarBrand.deleteMany({});

    // Generar 50 marcas de autos ficticias
    const brands = [];
    for (let i = 0; i < 50; i++) {
      brands.push({
        name: faker.vehicle.manufacturer(),
        country: faker.address.country(),
        established: faker.datatype.number({ min: 1900, max: 2023 }),
        models: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => faker.vehicle.model())
      });
    }

    await CarBrand.insertMany(brands);
    console.log('Datos de prueba insertados exitosamente');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
  });
