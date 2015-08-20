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

app.use(express.static(__dirname + '/public'));

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

// create a route 
app.get('/products', db_products.show);
app.get('/products/add', function(req, res){
	res.render('products_add')
});

app.post('/products/add', function(req, res){
	var data = { name : req.body.products};

    req.getConnection(function(err, connection){
        connection.query("insert into Products set ?", data, function(err,results){
			if(err)
			  console.log(err);

			  res.redirect('/products'); 
		});
	});		  
});

app.get('/categories', db_categories.show);
app.get('/categories/add', function(req, res){
	res.render('categories_add')
});

app.get('/categories/delete/:id', function(req, res){
	var categoryId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query("delete from Categories where Id =  ?", [categoryId], function(err,results){
			if(err)
    			console.log(err);

    			res.redirect('/categories');    
		});

	});

});

app.post('/categories/add', function(req, res){
	var data = { name : req.body.category};

    req.getConnection(function(err, connection){
        connection.query("insert into Categories set ?", data, function(err,results){
			if(err)
			  console.log(err);

			  res.redirect('/categories'); 
		});
	});		  
});

app.get('/categories/edit/:id', function(req, res){
	var categoryId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query("select * from Categories where Id =  ?", [categoryId], function(err,results){
			var category = results[0];
    			//console.log(err);
    			res.render('categories_edit', {
    			 category : category    
		  });

	  });

  });

app.post('/categories/edit/:id', function(req, res){
	 var id = req.params.id;
	 var data = { name : req.body.category};
	 req.getConnection(function(err, connection){
	 	connection.query("update Categories set ? where Id = ?",[data, id] ,function(err, results){
	 		if (err)
	 			console.log(err);

	 		res.redirect('/categories');

	 	});

  });

});

app.get('/Suppliers', db_suppliers.show);
app.get('/Purchases', db_purchases.show);
app.get('/Sales', db_sales.show);

//start the server
app.listen(3000, function(){
	console.log('Server started! At http://localhost: 3000');
});

