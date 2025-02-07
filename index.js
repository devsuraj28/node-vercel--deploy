// //ES6 Import

// // import {sum} from './lib.js';

// //To use above line if package.json is not configured then below error occurs...
// // (node:6444) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

// // console.log(sum(2,4));


// // Common JS Import
// const lib = require('./lib.js');
// const fs = require('fs');

// const t1 = performance.now();

// // const txt = fs.readFileSync('demo.txt','utf-8');

// fs.readFile('demo.txt','utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });


// // console.log(txt);
// const t2 = performance.now();

// console.log(lib.sum( 2, 4));

// console.log(t2-t1);


//----------------------------- Chapter 3 : Web Server -------------------------------------------------//

const http = require('http');
const fs = require('fs');
const { json } = require('stream/consumers');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const index = fs.readFileSync('index.html', 'utf-8');
const products = data.products;



const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log('Server Started');

    if (req.url.startsWith('/products')) {
        const id = req.url.split('/')[2];
        const product = products.find(p0 => p0.id === (+id)); //+ is added to convert string number into integers...
        res.setHeader('Content-Type', 'text/html');
        let modifiedIndex = index.replace('**title**', product.title)
            .replace('**url**', product.images)
            .replace('**price**', product.price)
            .replace('**rating**', product.rating);
    
        res.end(modifiedIndex);
        return;
    }
    

    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end(index);
            break;

        case '/api':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            break;

        default: res.writeHead(404).end();

    }


    // {
    //  // res.setHeader("Content-Type", "application/json");
    //  res.setHeader("Content-Type", "text/html");

    //  // res.end(JSON.stringify({"data" : "Hello World"}));
    //  // res.end("<h1>Hello World!</h1>");
    //  res.end(index);
    // }



});

server.listen(8000);
