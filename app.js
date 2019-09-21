const express=require('express');
const app=express();

// adding middleware for this rest api
app.use(function(req, res, next){
    res.status(200).json({
        message: "it works!"
    });
});

module.exports=app;