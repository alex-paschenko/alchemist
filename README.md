# Alchemist

![npm version](https://img.shields.io/npm/v/alchemist)
![Coverage](https://img.shields.io/badge/Coverage-90.00%-brightgreen)
![TypeScript Supported](https://img.shields.io/badge/TypeScript-%3E%3D4.0-blue)
![JavaScript Supported](https://img.shields.io/badge/JavaScript-ES6+-yellow)

Alchemist is a fast, lightweight, zero-dependency ts/js package designed to restore the rightful throne to the most powerful and elegant aspect of OOP: multiple inheritance.

<img src="docs/res/alchemist-800.png" alt="Alchemist Image" width="800">
<div style="margin-left: 30px;">
  <h3>What’s included:</h3>
  <ul style="list-style-image: url('docs/res/green-check-mark-16.png');">
    <li>Building the prototype chain:
      <ul style="list-style-image: none;">
        <li>Object.setPrototypeOf is used to craft a proper prototype chain.</li>
        <li>All prototype references from the base classes are part of the chain.</li>
      </ul>
    </li>
    <li>Copying instance properties:
      <ul style="list-style-image: none;">
        <li>Inside the Result constructor, instances of all base classes are created, and their properties are assigned to the final object.</li>
      </ul>
    </li>
    <li>Copying static properties:
      <ul style="list-style-image: none;">
        <li>All static properties and methods from the base classes are present in the Result class.</li>
      </ul>
    </li>
    <li>instanceof support:
      <ul style="list-style-image: none;">
        <li>instanceof checks work seamlessly for any of the base classes.</li>
      </ul>
    </li>
    <li>Compatibility with getters/setters:
      <ul style="list-style-image: none;">
        <li>The Alchemist carefully transfers all getters and setters from the original classes into the resulting class.</li>
      </ul>
    </li>
  </ul>
</div>
