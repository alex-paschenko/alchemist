// Let's say we want to alchemize five classes and properly
// distribute the parameters among them:
class A {};
class B {};
class C {};
class D {};
class E {};

// That means our passOutParamRules should have five elements.
// For example:
passOutParamRules: [-2, '...', 1, -1, 0];

// Let's say we initialize an instance of the alchemized class
// with seven parameters:
const ourMegaInstance =
  new AlchemizedClass('a', 2, { k: 8}, 10, [9], 'zz', 5);

// Internal AlchemizedClass constructor go through the passOutParamRules
// from left to right, applying the rules one by one:
//
// Step 1 - rule "-2":
//   constructor A takes last 2 params ('zz' and 5).
//   rest of params after this step: 'a', 2, { k: 8}, 10, [9]
// Step 2 - rule '...':
//   this rule is temporarily skipped.
//   rest of params after this step: 'a', 2, { k: 8}, 10, [9]
// Step 3 - rule "1":
//   constructor C takes 1 first param ('a').
//   rest of params after this step: 2, { k: 8}, 10, [9]
// Step 4 - rule "-1":
//   constructor D takes 1 last param ([9]).
//   rest of params after this step: 2, { k: 8}, 10
// Step 5 - rule "0":
//   constructor E takes no parameters.
//   rest of params after this step: 2, { k: 8}, 10
// Step 6 - apply postponed '...' rule:
//   constructor B takes rest of params (2, { k: 8}, 10)