const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB',
  {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name is specified."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//Automatically create a collection of "fruits"
const Fruit = mongoose.model("Fruit", fruitSchema);

const peach = new Fruit({
  name: "Peach",
  rating: 11,
  review: "Peaches are so yummy"
});

peach.save(function(err) {
  console.log(err);
});

const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

// apple.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 8,
  review: "The best fruit"
});

const orange = new Fruit({
  name: "Orange",
  rating: 9,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "Healthy food"
});

const mango = new Fruit({
  name: "Mango",
  rating: 9,
  review: "Mango is healthy"
});

mango.save();
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully inserted all the fruits into fruitsDB");
//   }
// })

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Amy",
  age: 32,
  favoriteFruit: mango
});

person.save();

// person.save();

// Person.updateOne({name: "John"}, {age: 34}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Updated successfully");
//   }
// })

Person.deleteOne({_id: "5fd994cc6143d85e54c3a370"}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted successfully")
    }
});

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(fruit => console.log(fruit.name));
  }
});
