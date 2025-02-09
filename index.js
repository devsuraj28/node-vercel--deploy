
//----------------------------- Chapter 2 : Web Server -------------------------------------------------//

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
 // res.setHeader("Content-Type", "application/json");
//  res.setHeader("Content-Type", "text/html");

 // res.end(JSON.stringify({"data" : "Hello World"}));
 // res.end("<h1>Hello World!</h1>");
//  res.end(index);
// }

});

server.listen(8000);
