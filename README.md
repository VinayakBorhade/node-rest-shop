# Node RESTful API
Restful Shop API built with Node.js and Express.js

## Dependencies
* node
* nodemon
* express
* morgan
* body-parser
* mongoose
* multer
* bcrypt
* jwt

## Usage
Download and move into the project directory
```
$ git clone https://github.com/VinayakBorhade/node-rest-shop.git
$ cd node-rest-shop
```

Add your Mongo Atlas Admin Credentials to a nodemon.json file (which you have to create) 
```
{
    "env": {
        "MONGO_ATLAS_PW": "YOUR_MONGO_USER_PW"
    }
}
```

After the MongoDB Atlas is set-up and dependenices are installed, start your server with following command
```
npm start
```

Once the server is started, use the api from Browser/Postman with following link (if hosted locally)
```
localhost:3000/
```

## API Overview
Following routes are supported by the API
* /users
* /products
* /orders

### /users

For registration of new users-
#### Request
```
Type: POST
URL: /users/signup
BODY: 
{
     "email": "email@domain.com",
     "password": "password"
}
```
#### Response
```
status: 201
{
     "message": "User Created"
}
```

For getting a token-
#### Request
```
Type: POST
URL: /users/login
BODY: 
{
     "email": "email@domain.com",
     "password": "password"
}
```
#### Response
```
status: 200
{
     "message": "Auth successful",
     "token": <token_value>
}
```

Deleting user from system-
#### Request
```
Type: DELETE
URL: /users/{user_id}
```
#### Response
```
Status: 200
{
     "message": "User deleted"
}
```

### /products

Get all products in system-
#### Request
```
Type: GET
URL: /products
```
#### Response
```
status: 200
{
     "name": <doc.name>,
     "price": <doc.price>,
     "_id": <doc._id>,
     "productImage": <doc.productImage>,
     "request": {
          "type": 'GET',
          "url": process.env.DOMAIN_NAME+ 'products/'+ _id
     }
}
```

Adding new product in the system
#### Request
```
Type: POST
URL: /products
BODY: 
{
     "name": "product1",
     "price": "$10.99",
     "productImage": <Image-File-Path>,
}
```
#### Response
```
status: 201
{
     "message": "Product Created",
     createdProduct:{
      "name": <doc.name>,
      "price": <doc.price>,
      "_id": <doc._id>,
      "request": {
           "type": 'GET',
           "url": process.env.DOMAIN_NAME+ 'products/'+ _id
      }
     }
}
```
