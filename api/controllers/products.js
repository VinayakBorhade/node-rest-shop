const mongoose=require('mongoose');
const Product=require('../models/product');

exports.products_get_all=function(req, res, next){
    Product
    .find()
    .select('name price _id productImage')
    .exec()
    .then(function(docs){
        console.log(docs);
        const response={
            count: docs.length,
            products: docs.map(function(doc){
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET',
                        url: process.env.DOMAIN_NAME+ 'products/'+doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.products_create_product=function(req, res, next){
    console.log(req.file);
    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(function(result){
            console.log(result);
            res.status(201).json({
                message: 'product created',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: process.env.DOMAIN_NAME+ 'products/'+result._id
                    }
                }
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.products_get_product=function(req, res, next){
    const id=req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(function(doc){
        console.log("from database: "+doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: process.env.DOMAIN_NAME+ 'products/'
                }
            });
        }
        else{
            res.status(404).json({message: "Invalid id"});
        }
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.products_update_product=function(req, res, next){
    const id=req.params.productId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.update({_id: id}, {$set: updateOps })
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: process.env.DOMAIN_NAME+ 'products/'+id
            }
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.products_delete_product=function(req, res, next){
    const id=req.params.productId;
    Product
    .remove({_id: id})
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: process.env.DOMAIN_NAME + 'products/',
                data: { name: 'String', price: 'Number' }
            }
        });
    }).catch(function(err){
        console.log(err);
        res.status(500).json({error: err});
    });
}