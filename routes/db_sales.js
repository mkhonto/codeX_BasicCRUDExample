exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query("select date_format(Sales.date, '%e %M %Y') as Date,Sales.id, Products.name as ProductName,Sales.no_sold as SoldNumber,Sales.selling_price as SellingPrice  from Sales  inner join Products on Sales.products_id = Products.id inner join Categories on Categories.id = Products.Category_id", [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'db_sales', {
    			products : results
    		});
      });
	});
}; 