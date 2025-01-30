import { recipe } from '@lenka/alchemist';

const prescription = { instanceOfSupport: true };

class SomeClassA {};
class SomeClassB {};

// You can either chain the call like this...
const CombinedClass =
  recipe(prescription).alchemize(SomeClassA, SomeClassB);

// ...or you can save the result into a variable if you plan
// to reuse the same settings in multiple places and call
// alchemize later:
const tunedAlchemize = recipe(prescription).alchemize;

const TheSameCombinedClass =
  tunedAlchemize(SomeClassA, SomeClassB);

const instance = new CombinedClass(...);