const express = require('express');
const app = express();
let count = 2;

app.use(express.json());

app.listen(3001);