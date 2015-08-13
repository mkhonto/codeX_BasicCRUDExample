// use strict mode define javascript code be executed 

//grabe the packages we need 
var express = require('express');
var  exphbs = require('express-handlebars');
var   mysql = require('mysql');
var port = process.env.PORT || 8080;
var   myConnection = require('express-myconnection');
var   bodyParser = require('body-parser');
var  db_products = require('./routes/db_products');
var db_categories = require('./routes/db_categories');
var db_suppliers = require('./routes/db_suppliers');
var db_purchases = require('./routes/db_purchases');
var db_sales = require('./routes/db_sales');

var app = express();

var dbOptions = {
	host: 'localhost',
	user: 'root',
	password: 'lisawaco55',
	port: 3306,
	database: 'Nelisa_Spaza',
};

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// setup the handlers
app.get('/', db_products.show);
app.get('/Products/edit/:id', db_products.get);
app.post('/Products/update/:id', db_products.update);
app.post('/Products/add/:id', db_products.add);
app.get('/Products/delete/:id', db_products.delete);

app.get('/Products', db_products.show);
app.get('/Categories', db_categories.show);
app.get('/Suppliers', db_suppliers.show);
app.get('/Purchases', db_purchases.show);
app.get('/Sales', db_sales.show);
// routes will go here

//start the server

//returns categories from the db 


app.listen(3000, function(){
	console.log('Server started! At http://localhost: 3000');
});

