if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const { router } = require('../route');

const app = express();

app.use(express.json());
app.use('/api/v1',router)

const PORT = process.env.PORT;

module.exports = { app, PORT };  