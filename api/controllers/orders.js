const mongoose=require('mongoose');
const Order=require('../models/order');
const Product=require('../models/product');

exports.orders_get_all = function(req, res, next){
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(function(docs){
        res.status(200).json({
            count: docs.length,
            orders: docs.map(function(doc){
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: process.env.DOMAIN_NAME+ 'orders/'+doc._id
                    }
                }
            })
        });
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create_order=function(req, res, next){
    Product.findById(req.body.productId)
    .then(function(product){
        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const order=new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();
    })
    .then(function(result){
        console.log(result);
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: process.env.DOMAIN_NAME+ 'orders/'+result._id
            }
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_get_order=function(req, res, next){
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(function(order){
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: process.env.DOMAIN_NAME+ 'orders/'
            }
        });
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_delete_order=function(req, res, next){
    Order.remove({ _id: req.params.orderId})
    .exec()
    .then(function(result){
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'GET',
                url: process.env.DOMAIN_NAME+ 'orders/',
                body: {
                    productId: 'ID', quantity: 'Number'
                }
            }
        });
    })
    .catch(function(err){
        res.status(500).json({
            error: err
        });
    });
};