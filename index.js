'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./route')

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
	console.log('get /');
	res.send('Hello from demo node+mongo, try /stations route');
});

app.use(routes);

db.on('connected', () => {
	app.listen(3000);
});