# Alchemist

![npm version](https://img.shields.io/npm/v/@lenka/alchemist?cacheSeconds=0)
![Coverage](https://img.shields.io/badge/Coverage-95.00%25-brightgreen)
![TypeScript Supported](https://img.shields.io/badge/TypeScript-%3E%3D4.0-blue)
![JavaScript Supported](https://img.shields.io/badge/JavaScript-ES6+-yellow)

Alchemist is a fast, lightweight, zero-dependency ts/js package designed to restore the rightful throne to the most powerful and elegant aspect of OOP: multiple inheritance.

<img src="docs/res/alchemist-730.png" alt="Alchemist Image" width="730">
<h3>Installation</h3>
npm i @lenka/alchemist
<h3>Using<h3>
<h4>Typescript:</h4>
import { alchemize } from '@lenka/alchemist';

alchemize(SomeClass, AnotherClass, OneMoreClass);

<h4>As ES6 module:</h4>
import { alchemize } from '@lenka/alchemist';

alchemize(SomeClass, , AnotherClass, OneMoreClass);

<h4>As CommonJS module:</h4>
const { alchemize } = require('@lenka/alchemist');

alchemize(SomeClass, , AnotherClass, OneMoreClass);
