//----------------------------- Chapter 3 : Express, Middlewares and REST Api's -------------------------------------------------//

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;


const server = express();

///Using Middlewares....

//Built-in Middlewares...
server.use(express.json());
// server.use(express.static('public-folder'));

///Third-Party Middlewars...
server.use(morgan('dev'));


//Custom Middleware.. 
// (Logging as Application-Level Middleware)
// server.use((req, res, next) => {
//     console.log(req.method, req.ip, req.hostname, new Date(), req.get('User-Agent'));
//     next();
// });

//Authentication (Route-Level Middleware..)
const authMiddleware = (req, res, next) => {
    if (req.query.password == '123' && req.method == 'GET') {
        next();
    }
    else if (req.body.password == '123' && req.method == 'POST') {
        next();
    }
    else {
        res.sendStatus(401);
    }
};

// Testing Api Route...  
// server.get('/', (req, res) => {
// res.status(200).json(data);
// res.send('<h1>Hello World</>');  
// res.sendFile('D:/My Projects/node_tut/node_practice/index.html'); //Copy path and turns every backward slash to foward slash...
// res.sendStatus(303);
// res.json('Hello World');
// });

//Api Endpoints -- Routes --
server.get('/', authMiddleware, (req, res) => {
    res.json({ 'type': req.method, 'status_code': res.statusCode });
});


server.post('/', authMiddleware, (req, res) => {
    res.json({ 'type': req.method, 'set_status_code': res.status = 201 });
});

server.put('/', (req, res) => {
    res.json({ 'type': req.method, 'sent_status': res.sendStatus(202) });
});

server.patch('/', (req, res) => {
    res.json({ 'type': req.method, 'status_message': res.statusMessage = 'Patch Successfull' });
});

server.delete('/', (req, res) => {
    res.json({ 'type': req.method, 'set_headers': res.setHeaders = { 'Content-Type': 'application/json' } });
});


server.listen(8080, (req, res) => {
    console.log('Server Started');
});

