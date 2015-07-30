insert into Sales ( date, products_id, product_name, no_sold, selling_price)
select date, Products.id, sales_csv.stock_item, sales_csv.no_sold, sales_csv.sales_price 
from Products, sales_csv 
where sales_csv.stock_item = Products.name;