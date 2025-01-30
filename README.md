# Alchemist

![npm version](https://img.shields.io/npm/v/@lenka/alchemist?cacheSeconds=0)
![Coverage](https://img.shields.io/badge/Coverage-97.38%25-brightgreen)
![TypeScript Supported](https://img.shields.io/badge/TypeScript-%3E%3D4.0-blue)
![JavaScript Supported](https://img.shields.io/badge/JavaScript-ES6+-yellow)

Alchemist is a fast, lightweight, zero-dependency ts/js package designed to restore the rightful throne to the most powerful and elegant aspect of OOP: multiple inheritance.

<img src="docs/res/alchemist-730.png" alt="Alchemist Image" width="730">
<h3>Installation</h3>
<div style="font-family: monospace; color: Navy; background-color: FloralWhite; padding: 6px; border-radius: 3px; width: fit-content;">
  npm i @lenka/alchemist
</div>
<h3>Using<h3>
<h4>Typescript:</h4>
<div style="font-family: monospace; color: Navy; background-color: FloralWhite; padding: 6px; border-radius: 3px; width: fit-content;">
  <span style="color: Purple;">import</span> { alchemize } from <span style="color: SaddleBrown">'@lenka/alchemist'</span>;

  alchemize(<span style="color: Black">SomeClass, AnotherClass, OneMoreClass</span>);</div>
<h4>As ES6 module:</h4>
<div style="font-family: monospace; color: Navy; background-color: FloralWhite; padding: 6px; border-radius: 3px; width: fit-content;">
  <span style="color: Purple;">import</span> { alchemize } from <span style="color: SaddleBrown">'@lenka/alchemist'</span>;

alchemize(<span style="color: Black">SomeClass, AnotherClass, OneMoreClass</span>);
</div>
<h4>As CommonJS module:</h4>
<div style="font-family: monospace; color: Navy; background-color: FloralWhite; padding: 6px; border-radius: 3px; width: fit-content;">
  const { alchemize } = <span style="color: Purple;">require</span>(<span style="color: SaddleBrown">'@lenka/alchemist'</span>);

alchemize(<span style="color: Black">SomeClass, AnotherClass, OneMoreClass</span>);
</div>
<h3>Documentation: <a href="https://alex-paschenko.github.io/alchemist">here</a></h3>
