var express = require('express');
const app = express();
let flag = true;

app.use(express.json());

let products = [
    {
        id: 'm1',
        name: 'milk',
        quantity: 23
    },
    {
        id: 'eg',
        name: 'eggs',
        quantity: 12
    }
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:id', (req, res) => {
    for(let product of products) {
        if(product.id === req.params.id) {
            flag = false;
            res.send(product);
        }
                if(product.name === req.params.id) {
            flag = false;
            res.send(product);
        }
    }
    if(flag) {
        res.send('There is no product with this ID or name');
    }
    flag = true;
});



app.post('/products', (req, res) => {
    for(let product of products) {
        if(product.id === req.body.id) {
            flag = false;
            res.send('The inserted ID already is in use');
        }
                if(product.name === req.body.name) {
            flag = false;
            res.send('The inserted name is already in use');
        }
    }
    if(flag) {
        products.push(req.body);
        res.send(req.body)
    }
    flag = true;
});

app.put('/products/:id', (req, res) => {
    products.forEach((product, index) => {
        if(product.id === req.params.id) {
            flag = false;
                products[index] = req.body;
                res.send(products[index]);
        }
    });
    if(flag) {
        res.send('There is no product with this ID');
    }
    flag = true;
});

app.delete('/products/:id', (req, res) => {
    products.forEach((product, index) => {
        if(product.id === req.params.id) {
            flag = false;
            products.splice(index, 1);
            res.send(req.params.id + ' product deleted');
        }
    });
    if(flag) {
        res.send('There is no product with this ID');
    }
    flag = true;
});

app.listen(3001);