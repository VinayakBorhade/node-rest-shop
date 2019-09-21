const express=require('express');
const router=express.Router();

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'orders were fetched'
    });
});

router.post('/', function(req, res, next){
    res.status(201).json({
        message: 'orders were created'
    });
});

router.get('/:orderId', function(req, res, next){
    res.status(200).json({
        message: 'order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', function(req, res, next){
    res.status(200).json({
        message: 'order details deleted',
        orderId: req.params.orderId
    });
});

module.exports=router;