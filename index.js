//----------------------------- Chapter 8 : Mongoose and Rest API's -------------------------------------------------//

//Import External Modules
const express = require('express');
const morgan = require('morgan');
const server = express();
const mongoose = require('mongoose');
require('dotenv').config();

//Import Custom Modules
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//DB Connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URL).then(() => console.log("MongoDB Connected"))
        .catch(err => console.error("Connection Error:", err));

}

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