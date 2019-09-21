const express=require('express');
const app=express();

const productRoutes=require('./api/routes/products');

// adding middleware for this rest api
app.use('/products', productRoutes);

module.exports=app;