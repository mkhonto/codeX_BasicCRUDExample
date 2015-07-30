drop table if exists Purchases;
drop table if exists Sales;
drop table if exists Suppliers;
drop table if exists Products;
drop table if exists Categories;

create table Categories (
					id int not null primary key auto_increment, 
					name varchar(35) 
					);

create table Products (
	                id int not null primary key auto_increment,
					name varchar(35),  
					category_id int not null,
					foreign key(category_id) references Categories(id)
				    );

create table Suppliers (
					id int not null primary key auto_increment,
					name varchar(35) 
				    );

create table Sales (
					id int not null primary key auto_increment,
					date char(35), 
				    products_id int,
				    product_name varchar(35),
					no_sold int,
					selling_Price int, 
				    foreign key(Products_id) references Products(id)
				    );

create table Purchases (
					id int not null primary key auto_increment,
					product_id int,
					quantity int,
					supplier_id int,
					cost_price int, 
					foreign key(product_id) references Products(id),
					foreign key(supplier_id) references Suppliers(id) 
				    );
