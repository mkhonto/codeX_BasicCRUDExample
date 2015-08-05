// use strict mode define javascript code be executed 

//grabe the packages we need 
var express = require('express');
var  exphbs = require('express-handlebars');
var   mysql = require('mysql');
var   myConnection = require('express-myconnection');
var   bodyParser = require('body-parser');
var   products = require('./routes/products');

var app = express();
//var port = process.env.PORT || 8080;

var app = express();

var dbOptions = {
	host: 'localhost',
	user: 'root',
	password: 'lisawaco55',
	port: 3306,
	database: 'Nelisa_Spaza',
};
app.use(myConnection(mysql, dbOptions, 'single'));

// routes will go here

//start the server

//returns categories from the db 
app.get('/categories',function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from Categories', [], function(err, results) {
        	if (err) return next(err);

    		res.send(results);
    	
    		});
      });
});

//returns products from the db
app.get('/products',function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * from Products', [], function(err, results) {
        	if (err) return next(err);

    		res.send(results);
    	
    		});
      });
});

app.listen(3000, function(){
	console.log('Server started! At http://localhost: 3000');
});

