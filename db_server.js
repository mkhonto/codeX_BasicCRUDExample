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
var db_main = require('./routes/db_main');

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

// create a route 
app.get('/', db_main.show);
app.get('/', db_products.show);
app.get('/products', db_products.show);

//this connect to the web form
app.get('/products/add', function(req, res){

  req.getConnection(function(err, connection){

   var categoryQuery = "select id, name from Categories";
      
        connection.query(categoryQuery, function(err, categories){
				if (err) return next(err);
				res.render('products_add', {categories : categories});
        });
    });

});

app.post('/products/add', function(req, res){
	var data = { 
		      category_id : req.body.categoryId,
		      name : req.body.product
		    		};
					
    req.getConnection(function(err, connection){
        connection.query("insert into Products set ?", data, function(err,results){
			if(err)
			  console.log(err);

			  res.redirect('/products'); 
		});
	});		  
});

app.get('/products/delete/:id', function(req, res){
	var productId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query("delete from Products where Id =  ?", [productId], function(err,results){
			if(err)
    			console.log(err);

    			res.redirect('/products');    
		});

	});

});

app.get('/products/edit/:id', function(req, res){

	var categoryQuery = "select id, name from Categories";
	var productId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query(categoryQuery, function(err, categories){
			if(err) return next(err);
			connection.query("select * from Products where Id =  ?", [productId], function(err,results){


			var product = results[0];

			var categoryList = categories.map(function(category){
				return{ 
					id : category.id,
					name : category.name,
					selected : category.id === product.category_id
				}
			});
    			//console.log(err);
    			res.render('products_edit', {
    			 categories : categoryList,
    			 product : product    
		        });
            
            });
	    
	    });

     });

  });

app.post('/products/edit/:id', function(req, res){
	 var id = req.params.id;
	 var data = { name : req.body.product};
	 req.getConnection(function(err, connection){
	 	connection.query("update Products set ? where Id = ?",[data, id] ,function(err, results){
	 		if (err)
	 			console.log(err);

	 		 res.redirect('/products');

	  	    });

        });

    });


//started here
app.get('/categories', db_categories.show);
app.get('/categories/add', function(req, res){
	res.render('categories_add')
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


app.get('/suppliers', db_suppliers.show);
app.get('/suppliers/add', function(req, res){
	res.render('suppliers_add')
});

app.post('/suppliers/add', function(req, res){
	var data = { name : req.body.supplier};

    req.getConnection(function(err, connection){
        connection.query("insert into Suppliers set ?", data, function(err,results){
			if(err)
			  console.log(err);

			  res.redirect('/suppliers'); 
		  });

	 });

});

app.get('/suppliers/edit/:id', function(req, res){
	var supplierId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query("select * from Suppliers where Id =  ?", [supplierId], function(err,results){
			var supplier = results[0];
    			//console.log(err);
    			res.render('suppliers_edit', {
    			 supplier : supplier    
		  });

	  });

  });

app.post('/suppliers/edit/:id', function(req, res){
	 var id = req.params.id;
	 var data = { name : req.body.supplier};
	 req.getConnection(function(err, connection){
	 	connection.query("update Suppliers set ? where Id = ?",[data,id] ,function(err, results){
	 		if (err)
	 			console.log(err);

	 		res.redirect('/suppliers');

	  	});

    });

  });

});

app.get('/suppliers/delete/:id', function(req, res){
	var supplierId = req.params.id;
	req.getConnection(function(err, connection){

		connection.query("delete from Suppliers where Id =  ?", [supplierId], function(err,results){
			if(err)
    			console.log(err);

    			res.redirect('/suppliers');    
		});

	});

});

app.get('/purchases', db_purchases.show);
app.get('/purchases/add', function(req, res){

	req.getConnection(function(err, connection){
		var products = "select id, name from Products";
		var suppliers = "select id, name from Suppliers";


		  connection.query(products, function(err, products){
		  connection.query(suppliers, function(err, suppliers){
		  	 if (err) return next(err);
		 
	         res.render('purchases_add', {products : products, suppliers : suppliers});
            });
        });
    });
});



app.post('/purchases/add', function(req, res){
	var data = {
		supplier_id : req.body. supplier_id,
		product_id : req.body. product_id,
		quantity : req.body. quantity,
		cost_price : req.body. cost_price
	}

					
    req.getConnection(function(err, connection){
        connection.query("insert into Purchases set ?", data, function(err,results){
			if(err)
			  console.log(err);

			  res.redirect('/purchases'); 
		});
	});		  
})

app.get('/purchases/edit/:id', function(req, res){

var productQuery = "select id, name from Products";
	var supplierQuery = "select id, name from Suppliers";
	var purchaseId = req.params.id;

	  req.getConnection(function(err, connection){
	  	connection.query(productQuery, function(err, products){
	  		connection.query(supplierQuery, function(err, suppliers){
	  			if(err) return next(err);
	  			
		connection.query("select * from Purchases where Id =  ?", [purchaseId], function(err,results){
			var purchase = results[0];
    			//console.log(err);
    		var productList = products.map(function(product){
    			return {
    				id : product.id,
    				name : product.name,
    				selected : product.id === purchase.product_id
    			}
    		})

    		var supplierList = suppliers.map(function(supplier){
    			return {
    				id : supplier.id,
    				name : supplier.name,
    				selected : supplier.id === purchase.supplier_id
    			}
    		})
    			   res.render('purchases_edit', {
    			     products : productList,
    			     suppliers : supplierList,
    			     purchase : purchase 

		            });

	            });
           });

        });

    });	

});  	

app.post('/purchases/edit/:id', function(req, res){
	 var id = req.params.id;
	 var data = { name : req.body.purchase};
	 req.getConnection(function(err, connection){
	 	connection.query("update Purchases set ? where Id = ?",[data,id] ,function(err, results){
	 		if (err)
	 			console.log(err);

	 		res.redirect('/purchases');

	  	});

    });

  });


app.get('/sales', db_sales.show);
app.get('/sales/add', function(req, res){
	res.render('sales_add')
});

app.post('/sales/add', function(req, res){
	var data = { 
		      product_id : req.body.productId,
		      name : req.body.sale
		    		};
					
    req.getConnection(function(err, connection){
        connection.query("insert into Sales set ?", data, function(err,results){
			if(err)
			  console.log(err);

			  res.redirect('/sales'); 
		});
	});		  
});

//start the server
app.listen(3000, function(){
	console.log('Server started! At http://localhost: 3000');
});

