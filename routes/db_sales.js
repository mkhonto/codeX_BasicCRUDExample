exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query("select sales_csv.day as Day,date_format(sales_csv.date, '%e %M %Y') as Date, sales_csv.stock_item as ProductName, sales_csv.no_sold as SoldNumber, sales_csv.sales_price as SellingPrice from sales_csv", [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'db_sales', {
    			products : results
    		});
      });
	});
};