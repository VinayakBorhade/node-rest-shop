const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

mongoose.connect(
    'mongodb+srv://node-shop:'+
    process.env.MONGO_ATLAS_PW+
    '@node-rest-shop-if4i4.mongodb.net/test?retryWrites=true&w=majority'
);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handling CORS(Cross Origin Request Server) errors, so api can allow requests from any client
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    // every browser first sends options request before any post req for checking if req is possible
    if(req.method==='OPTIONS'){
        // telling the browser all possible requests that it may send 
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

        //using return discontinues the requests to go to other routes written below
        return res.status(200).json({});
    }
    next();
});

// adding middleware for this rest api
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(function(req, res, next){
    const error=new Error('not found');
    error.status=404;
    next(error);
});

app.use(function(error, req, res, next){
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports=app;