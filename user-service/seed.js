const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    const users = [];
    for (let i = 0; i < 50; i++) {
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: faker.datatype.number({ min: 18, max: 70 }),
      });
    }
    await User.insertMany(users);
    console.log('50 usuarios ficticios insertados.');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedUsers();
