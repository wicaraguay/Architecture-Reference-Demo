// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const soap = require('soap');
const fs = require('fs');
const path = require('path');
const CarService = require('./services/carService');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/carservice';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Definir el servicio SOAP
const service = {
  CarService: {
    CarServicePortType: {
      getAllBrands: async function(args, callback, soapHeader) {
        try {
          const result = await CarService.getAllBrands(args);
          callback(result);
        } catch (err) {
          callback({ Fault: err.Fault || { Faultstring: err.message } });
        }
      },
      getBrandByName: async function(args, callback, soapHeader) {
        try {
          const result = await CarService.getBrandByName(args);
          callback(result);
        } catch (err) {
          callback({ Fault: err.Fault || { Faultstring: err.message } });
        }
      },
      addBrand: async function(args, callback, soapHeader) {
        try {
          const result = await CarService.addBrand(args);
          callback(result);
        } catch (err) {
          callback({ Fault: err.Fault || { Faultstring: err.message } });
        }
      }
      // Agrega más métodos según sea necesario
    }
  }
};

// Cargar el WSDL
const wsdlPath = path.join(__dirname, 'wsdl', 'carService.wsdl');
const xml = fs.readFileSync(wsdlPath, 'utf8');

// Crear el endpoint SOAP
app.post('/wsdl', function(req, res) {
  res.set('Content-Type', 'text/xml');
  res.send(xml);
});

// Iniciar el servidor
const server = app.listen(port, function() {
  console.log(`Servidor escuchando en http://localhost:${port}/wsdl`);

  // Crear el servidor SOAP
  soap.listen(server, '/soap', service, xml);
});
