class Volume {
  #length;
  #width;
  #height;

  constructor(length, width, height) {
    this.#length = length;
    this.#width = width;
    this.#height = height;
  }

  calculateVolume() {
    return this.#length * this.#width * this.#height;
  }
}

class Person {
  #firstName;
  #lastName;
  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}