//----------------------------- Chapter 5 : MVC Architecture -------------------------------------------------//

//Import External Modules
const express = require('express');
const morgan = require('morgan');
const server = express();

//Import Custom Modules
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');



//Middlewares
server.use(express.json());
server.use(express.static('public-folder'));
server.use(morgan('dev'));


//Routes -- Api Endpoints --
server.use('/api/products', productRouter.router);
server.use('/api/users', userRouter.router);



server.listen(8080, (req, res) => {
    console.log('Server Started');
});