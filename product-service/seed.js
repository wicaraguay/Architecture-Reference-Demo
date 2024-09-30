const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    const products = [];
    for (let i = 0; i < 50; i++) {
      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
      });
    }
    await Product.insertMany(products);
    console.log('50 productos ficticios insertados.');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedProducts();
