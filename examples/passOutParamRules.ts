import { recipe, Recipe } from '@lenka/alchemist';

/**
 * Let's say we need to merge four such classes:
 */

// Class A: takes two arguments
class A {
  constructor(private a: number, private b: number) {}
  sum(): number { return this.a + this.b}
}

// Class B: takes no arguments
class B {
  whereAreYou(): string { return "I'm here!"; }
}

// Class C: takes any number of arguments
class C {
  constructor(...args: number[]) {
    this.args = args;
  }
  max(): number { return Math.max(...this.args); }
  private args: number[];
}

// Class D: takes one argument
class D {
  constructor(private n: number) {}
  plus(b: number): number { return this.n + b }
}

/**
 * We're going to alchemize them in this order: A, B, C, D.
 * Alright, let's get started!
 */

/**
 * The first thing we need to do is define the parameter distribution
 * rules for the constructors of the original classes.
 * Since the constructor of class C can take any number of arguments,
 * we want to preserve this flexibility for the combined class as well.
 * So, our combined class will be able to accept any number of parameters:
 * const combinedInstance = new Combined(a, b, c, d, ..., n);
 * At the same time:
 * - class A will always receive the first two parameters.
 * - class B won’t receive any parameters at all.
 * - class D will get the last parameter.
 * - class C will take everything else in between.
 * So, our rules will look like this:
 */
const passOutParamRules: Recipe['passOutParamRules'] = [2, 0, '...', -1];

/**
 * Next, Let's set up a customized alchemize that will create combined
 * classes with this behavior:
 */
const customizedAlchemize = recipe({ passOutParamRules }).alchemize;

/**
 * And let’s call it to create our combined class:
 */
const CombinedClass = customizedAlchemize(A, B, C, D);

/**
 * Note: Of course, we could have done all of this in a single step.
 * This directly creates the combined class without needing to
 * store customizedAlchemize separately. However, defining alchemize
 * beforehand can be useful if we plan to reuse the same rules
 * multiple times.
 */
const TheSameCombinedClass = recipe({
  passOutParamRules: [2, 0, '...', -1],
}).alchemize(A, B, C, D);

/**
 * We’re all set! Now we can create instances of CombinedClass
 * and see it in action.
 */
const combo = new CombinedClass(10, 11, 12, 13, 14, 15);

console.log(combo.sum());         // 21 (10 + 11)
console.log(combo.whereAreYou()); // I'm here!
console.log(combo.max());         // 14 (maximum of 12, 13, 14)
console.log(combo.plus(5));       // 20 (15 + 5)
