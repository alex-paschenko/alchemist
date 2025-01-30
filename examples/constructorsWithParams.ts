class Volume {
  constructor(private length: number, private width: number, private height: number) {}

  calculateVolume(): number {
    return this.length * this.width * this.height;
  }
}

class Person {
  constructor(private firstName: string, private lastName: string) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}