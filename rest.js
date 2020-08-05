const express = require('express');
const app = express();
let count = 2;

app.use(express.json());

let products = [
    {
        id: 0,
        name: 'Milk',
        quantity: 2
    },
    {
        id: 1,
        name: 'Eggs',
        quantity: 12
    }
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.listen(3001);