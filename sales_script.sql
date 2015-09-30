insert into Sales ( id, date, products_id, no_sold, selling_price)
select id, date, Products.id, sales_csv.no_sold, sales_csv.sales_price 
from Products, sales_csv 
where sales_csv.stock_item = Products.name;