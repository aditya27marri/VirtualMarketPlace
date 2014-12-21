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
				if (quantity>0){
				insertIntoCart(buyerId,productId,productName,productType,category,quantity,brand,imageName,state,price);
				//showcart(req,res);
				res.redirect('/showcart');
				}else{
					res.render('error',{ title:
						'Unable to signin !! ' ,message: 'out of stock',back:'/product/:productId'});
				}
		}

	});	//connection.end();
	dataPool.returnConnection(connection);
}

function insertIntoCart(buyerId,productId,productName,productType,category,quantity,brand,imageName,state,price)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var validity=1;
	var query = "INSERT INTO shoppingCart(buyerId,productId,productType,productName,category,quantity,brand,imageName,state,price) VALUES('" + buyerId + "','"  + productId + "','"+ productType +"','" + productName  + "','" +category + "','"  + quantity + "','" + brand +"','" + imageName + "','" + state + "','" + price + "')";
	console.log(" Inside shoppingCart: "+query);
	connection.query(query,function(err,results){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			console.log("insert into shopping cart successfull")
			
		}

	});
	//connection.end();
	dataPool.returnConnection(connection);
}	

function showcart(req,res)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var query = "SELECT * from shoppingCart where buyerId='" + req.session.ssn + "'";
	console.log("select shoppingCart: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			var email = req.session.email;
		        	res.render('cart',{ title:
					'buyer cart' ,rows:rows,name:email},function(err, result) {
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
exports.deleteProductFromCart = function(req,res,cartId)
{	var connection = dataPool.getConnection();
//var connection=connect();
var query = "delete from shoppingCart where cartItemId='"+cartId+"' and buyerId='"+ req.session.ssn + "'";
console.log("delete from shoppingCart: "+query);
connection.query(query,function(err,results){
	if(err){
		throw err;
		console.log(err);
	}
	else{
		console.log("\cart item deleted.");
		res.redirect('/showcart');
	}

});
	dataPool.returnConnection(connection);
}
exports.addToShoppingCart = addToShoppingCart;
exports.insertIntoCart = insertIntoCart;
exports.showcart = showcart;