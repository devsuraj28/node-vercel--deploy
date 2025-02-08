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


//----------------------------- Chapter 2 : Web Server -------------------------------------------------//

// const http = require('http');
// const fs = require('fs');
// const { json } = require('stream/consumers');

// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const index = fs.readFileSync('index.html', 'utf-8');
// const products = data.products;



// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     console.log('Server Started');

//     if (req.url.startsWith('/products')) {
//         const id = req.url.split('/')[2];
//         const product = products.find(p0 => p0.id === (+id)); //+ is added to convert string number into integers...
//         res.setHeader('Content-Type', 'text/html');
//         let modifiedIndex = index.replace('**title**', product.title)
//             .replace('**url**', product.images)
//             .replace('**price**', product.price)
//             .replace('**rating**', product.rating);

//         res.end(modifiedIndex);
//         return;
//     }


// switch (req.url) {
//     case '/':
//         res.setHeader('Content-Type', 'text/html');
//         res.end(index);
//         break;

//     case '/api':
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(data));
//         break;

//     default: res.writeHead(404).end();

// }


// {
//  // res.setHeader("Content-Type", "application/json");
//  res.setHeader("Content-Type", "text/html");

//  // res.end(JSON.stringify({"data" : "Hello World"}));
//  // res.end("<h1>Hello World!</h1>");
//  res.end(index);
// }

// });

// server.listen(8000);



//----------------------------- Chapter 3 : Express, Middlewares and REST Api's -------------------------------------------------//

// const fs = require('fs');
// const express = require('express');
// const morgan = require('morgan');


// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;


// const server = express();


///Using Middlewares....

//Built-in Middlewares...
// server.use(express.json());
// server.use(express.static('public-folder'));

///Third-Party Middlewars...
// server.use(morgan('dev'));


//Custom Middleware.. 
// (Logging as Application-Level Middleware)
// server.use((req, res, next) => {
//     console.log(req.method, req.ip, req.hostname, new Date(), req.get('User-Agent'));
//     next();
// });

//Authentication (Route-Level Middleware..)
// const authMiddleware = (req, res, next) => {
//     if (req.query.password == '123' && req.method == 'GET') {
//         next();
//     }
//     else if (req.body.password == '123' && req.method == 'POST') {
//         next();
//     }
//     else {
//         res.sendStatus(401);
//     }
// };

// Testing Api Route...  
// server.get('/', (req, res) => {
// res.status(200).json(data);
// res.send('<h1>Hello World</>');  
// res.sendFile('D:/My Projects/node_tut/node_practice/index.html'); //Copy path and turns every backward slash to foward slash...
// res.sendStatus(303);
// res.json('Hello World');
// });

//Api Endpoints -- Routes --
// server.get('/', authMiddleware, (req, res) => {
//     res.json({ 'type': req.method, 'status_code': res.statusCode });
// });


// server.post('/', authMiddleware, (req, res) => {
//     res.json({ 'type': req.method, 'set_status_code': res.status = 201 });
// });

// server.put('/', (req, res) => {
//     res.json({ 'type': req.method, 'sent_status': res.sendStatus(202) });
// });

// server.patch('/', (req, res) => {
//     res.json({ 'type': req.method, 'status_message': res.statusMessage = 'Patch Successfull' });
// });

// server.delete('/', (req, res) => {
//     res.json({ 'type': req.method, 'set_headers': res.setHeaders = { 'Content-Type': 'application/json' } });
// });


// server.listen(8080, (req, res) => {
//     console.log('Server Started');
// });


//----------------------------- Chapter 4 : REST Api's & CRUD-------------------------------------------------//

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;


const server = express();

server.use(express.json());
server.use(express.static('public-folder'));
server.use(morgan('dev'));



//REST API's - C R U D

//Create Product
server.post('/products', (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
});

//Read Products
server.get('/products', (req, res) => {
    res.json(products);
});

//Read Product by ID
server.get('/products/:id', (req, res) => {
    const id = +req.params.id;
    const product = products.find(p => p.id === id);
    res.json(product);
});

//Update Product
server.put('/products/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, { id: id, ...req.body});
    res.status(202).json({ 'msg': "Product Updated Successfully" });
});

//Patch Product
server.patch('/products/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product, ...req.body});
    res.status(202).json({ 'data': products[productIndex], 'msg': "Product Details Updated Successfully" });
});


//Delete Product
server.delete('/products/:id', (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.json({ 'data' : product,'msg': "Product Deleted Successfully" });
});



server.listen(8080, (req, res) => {
    console.log('Server Started');
});


