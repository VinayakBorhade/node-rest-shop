const express=require('express');
const router=express.Router();

router.get('/', function(req, res, next){
    res.status(200).json({
        message: 'handling get requests to /products'
    });
});

router.post('/', function(req, res, next){
    const product={
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'handling post requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', function(req, res, next){
    const id=req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message:'discovered the special id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'id is',
            id: id
        });
    }
});

router.patch('/:productId', function(req, res, next){
    res.status(200).json({
        message: 'updated product'
    });
});

router.delete('/:productId', function(req, res, next){
    res.status(200).json({
        message: 'deleted product'
    });
});

module.exports=router;