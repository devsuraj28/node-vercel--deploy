//----------------------------- Chapter 1 : Modules, Import/Export & Packages -------------------------------------------------//

// //ES6 Import

// // import {sum} from './lib.js';

// //To use above line if package.json is not configured then below error occurs...
// // (node:6444) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

// // console.log(sum(2,4));


// // Common JS Import
const lib = require('./lib.js');
const fs = require('fs');

const t1 = performance.now();

// const txt = fs.readFileSync('demo.txt','utf-8');

fs.readFile('demo.txt','utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });


// console.log(txt);
const t2 = performance.now();

console.log(lib.sum( 2, 4));

console.log(t2-t1);


