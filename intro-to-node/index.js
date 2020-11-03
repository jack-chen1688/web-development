const fs = require("fs");
const superheroes = require("superheroes");
const supervillains = require("supervillains");

fs.copyFileSync("file1.txt", "file2.txt");
try {
  const data = fs.readFileSync("file2.txt", "utf8");
  console.log(data);
} catch (e) {
  console.error(err);
}
fs.unlinkSync("file2.txt");
nameSuperHero = superheroes.random();
nameSuperVillain = supervillains.random();

console.log(nameSuperHero + " vs " + nameSuperVillain);
