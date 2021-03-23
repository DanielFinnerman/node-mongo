'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({extended: false})); // for parsing html form x-www-form-urlencoded
// and/or app.use(express.json()); // for parsing application/json
app.use('/cat', require('./route'));

app.get('/', (req, res) => {
	console.log('get /');
	res.send('Hello from demo node+mongo, try /cat route');
});


db.on('connected', () => {
  app.listen(3000);
});