const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const Product=require('../models/product');

router.get('/', function(req, res, next){
    Product
    .find()
    .exec()
    .then(function(docs){
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/', function(req, res, next){
    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(function(result){
            console.log(result);
            res.status(201).json({
                message: 'handling post requests to /products',
                createdProduct: result
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
});

router.get('/:productId', function(req, res, next){
    const id=req.params.productId;
    Product.findById(id)
    .exec()
    .then(function(doc){
        console.log("from database: "+doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: "Invalid id"});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productId', function(req, res, next){
    const id=req.params.productId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.update({_id: id}, {$set: updateOps })
    .exec()
    .then(function(result){
        console.log(result);
        res.status(200).json(result);
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', function(req, res, next){
    const id=req.params.productId;
    Product
    .remove({_id: id})
    .exec()
    .then(function(result){
        res.status(200).json(result);
    }).catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports=router;