/**
 * New node file
 */
/**
 * New node file
 */
var mysql=require('mysql');
var dataPool=require('../routes/ConnectionPooling');

function addToShoppingCart(req,res,id)
{
	
	var connection = dataPool.getConnection();
	
	var query = "select buyerId,product.productId,productName,productType,product.category,product.quantity,brand,imageName,state,price from product inner join Selling on product.productId = Selling.productId where product.productId=" + id;
	
	console.log(query); 
	connection.query(query,function(err,rows){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
				console.log("DATA : "+JSON.stringify(rows));
				var buyerId = req.session.ssn;
				var productId = rows[0].productId;
				var productName = rows[0].productName;
				var productType = rows[0].productType;
				var category = rows[0].category;
				var quantity = rows[0].quantity;
				var brand = rows[0].brand;
				var imageName = rows[0].imageName;
				var state = rows[0].state;
				var model = rows[0].model;
				var descripition = rows[0].descripition;
				var price = rows[0].price;
				insertIntoCart(buyerId,productId,productName,productType,category,quantity,brand,imageName,state,price);
				//showcart(req,res);
				res.redirect('/myProducts');
		}

	});	//connection.end();
	dataPool.returnConnection(connection);
}

function updateSelling(req,res,id)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var productName=req.param('product');
	var productType=req.param('productType');
	var category=req.param('category');
	var quantity=req.param('quantity');
	var brand=req.param('brand');
	var state=req.param('state');
	var model=req.param('model');
	var description=req.param('description');
	var price=req.param('price');
	var query = "update product set productName='"+productName+"', productType='"+productType+"'" + ",category='"+category+"', quantity='"+quantity+"', category='"+category+"', brand='"+brand+"',state='"+state+"',model='"+model+"', description='"+description +"'where productId ='"+id+"'";
	console.log(" update product: "+query);
	connection.query(query,function(err,results){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			console.log("updated into product successfull")
			
		}

	});
	var query = "update Selling set price =" + price +" where productId="+id;
	console.log(" update product: "+query);
	connection.query(query,function(err,results){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			console.log("updated into product successfull")
			res.redirect('/myProducts');
		}

	});
	//connection.end();
	dataPool.returnConnection(connection);
}	

function myProducts(req,res)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var query = "SELECT * FROM product inner join Selling where product.productId = Selling.productId and sellerId ='" + req.session.ssn + "'";
	console.log("select selling: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			var email = req.session.email;
		        	res.render('myProducts',{ title:
					'my products' ,rows:rows,name:email},function(err, result) {
				        // render on success
				        if (!err) {
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
			
		}

	});
	//connection.end();
	dataPool.returnConnection(connection);
}

function getProducts(req,res,id)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var query = "SELECT * FROM product inner join Selling where product.productId = Selling.productId and product.productId ='" + id + "'";
	console.log("select selling: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			var email = req.session.email;
		        	res.render('updateProduct',{ title:
					'update products' ,rows:rows,name:email},function(err, result) {
				        // render on success
				        if (!err) {
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
			
		}

	});
	//connection.end();
	dataPool.returnConnection(connection);
}

exports.deleteUserProduct = function(req,res,id)
{	var connection = dataPool.getConnection();
//var connection=connect();
var query = "delete from product where productId='"+id+"' and buyerId='"+ req.session.ssn + "'";
console.log("delete from shoppingCart: "+query);
connection.query(query,function(err,results){
	if(err){
		throw err;
		console.log(err);
	}
	else{
		console.log("\deleted from product table.");
	}

});
	
var query = "delete from seller where productId='"+id+"' and buyerId='"+ req.session.ssn + "'";
console.log("delete from shoppingCart: "+query);
connection.query(query,function(err,results){
	if(err){
		throw err;
		console.log(err);
	}
	else{
		console.log("\deleted from product table.");
		res.redirect('/myProducts');
	}

});
	dataPool.returnConnection(connection);
}

exports.myProducts = myProducts;
exports.getProducts = getProducts;
exports.updateSelling = updateSelling;
