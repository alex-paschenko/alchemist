import { alchemize } from "./alchemize";
class Dog {
    bark() {
        return "woof";
    }
}
class Cat {
    meow() {
        return "meow";
    }
}
const DogCat = alchemize(Dog, Cat);
const dogCat = new DogCat();
console.log(dogCat.bark()); // woof
console.log(dogCat.meow()); // meow
//# sourceMappingURL=t.js.map