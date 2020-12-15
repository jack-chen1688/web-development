const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB',
  {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

//Automatically create a collection of "fruits"
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

//fruit.save();
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
})

Fruit.insertMany([kiwi, orange, banana], function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully inserted all the fruits into fruitsDB");
  }
})
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });
//
// const Person = mongoose.model("Person", personSchema);
//
// const person = new Person({
//   name: "John",
//   age: 32
// });
//
// person.save();