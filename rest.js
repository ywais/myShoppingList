const express = require('express');
const app = express();
let flag = true;

app.use(express.json());

let products = [
    {
        id: 'm1',
        name: 'Milk',
        quantity: 2
    },
    {
        id: 'eg',
        name: 'Eggs',
        quantity: 12
    }
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/product/:id', (req, res) => {
    for(let product of products) {
        if(product.id === req.params.id) {
            flag = false;
            res.send(product);
        }
    }
    if(flag) {
        res.send('There is no product with this ID');
    }
    flag = true;
});

app.post('/product', (req, res) => {
    for(let product of products) {
        if(product.id === req.body.id) {
            flag = false;
            res.send('The inserted ID is in use');
        }
    }
    if(flag) {
        products.push(req.body);
        res.send(req.body)
    }
    flag = true;
});

app.put('/product/:id', (req, res) => {
    products.forEach((product, index) => {
        if(product.id === req.params.id) {
            flag = false;
            if(req.params.id === req.body.id) {
                products[index] = req.body;
                res.send(products[index]);
            } else {
                res.send('Do not change the product ID!');
            }
        }
    });
    if(flag) {
        res.send('The is no product with this ID');
    }
    flag = true;
});

app.listen(3001);