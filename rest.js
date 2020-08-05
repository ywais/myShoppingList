const express = require('express');
const app = express();
let count = 2;

app.use(express.json());

app.get('/products', (req, res) => {
    res.send('products');
});

app.listen(3001);