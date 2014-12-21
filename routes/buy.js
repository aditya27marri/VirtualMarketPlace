/**
 * New node file
 */
var mysql=require('mysql');
var dataPool=require('../routes/ConnectionPooling');
var redis = require("redis"), client = redis.createClient();
client.on("error", function(err) {
	console.log("Error " + err);
});

exports.search = function(req, res){
	var value=req.param("search");
	var connection = dataPool.getConnection();
	
	var query = "SELECT * from product where (category like "+ "'" + '%'+value+"') OR"+"(productType like "+"'" +'%'+value+"')";
	console.log(query); 
	
	client.get("search", function(err, reply) {
		if (reply === null) {
	connection.query(query,function(err,rows){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
				        // render on success
				        if (!err) {
					client.set("search", JSON.stringify(res));
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
			else
				{
				res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
		}

	});	//connection.end();
	dataPool.returnConnection(connection);
}
else
		{
			res.render('product_list',{ title:
					'product details' ,rows:reply},function(err, result) {
				        // render on success
				        if (!err) {
					client.set("search", JSON.stringify(res));
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
};


exports.electronics = function(req, res){
var connection = dataPool.getConnection();
	
	var query = "SELECT * FROM product where category like '%lectronics'";
	
	console.log(query); 
	connection.query(query,function(err,rows){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
			
		}

	});	//connection.end();
	dataPool.returnConnection(connection);
};

exports.clothes = function(req, res){
	var connection = dataPool.getConnection();
		
		var query = "SELECT * from product where category like '%lothes'";
		
		console.log(query); 
		connection.query(query,function(err,rows){
			if (err) 
			{
				console.log("ERROR: " + err.message);
			}
			else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
			
		}

		});	//connection.end();
		dataPool.returnConnection(connection);
};

exports.luggage = function(req, res){
	var connection = dataPool.getConnection();
		
		var query = "SELECT * from product where category like '%uggage'";
		
		console.log(query); 
		connection.query(query,function(err,rows){
			if (err) 
			{
				console.log("ERROR: " + err.message);
			}
			else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
			
		}

		});	//connection.end();
		dataPool.returnConnection(connection);
};

exports.movies = function(req, res){
	var connection = dataPool.getConnection();
		
		var query = "SELECT * from product where category like '%ovies'";
		
		console.log(query); 
		connection.query(query,function(err,rows){
			if (err) 
			{
				console.log("ERROR: " + err.message);
			}
			else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
			
		}

		});	//connection.end();
		dataPool.returnConnection(connection);
};

exports.automobiles = function(req, res){
	var connection = dataPool.getConnection();
		
		var query = "SELECT * from product where category like '%uto_obiles'";
		
		console.log(query); 
		connection.query(query,function(err,rows){
			if (err) 
			{
				console.log("ERROR: " + err.message);
			}
		else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
			
		}
		});	//connection.end();
		dataPool.returnConnection(connection);
};

exports.other = function(req, res){
	var connection = dataPool.getConnection();
		
		var query = "SELECT * from product where category like '%ther'";
		
		console.log(query); 
		connection.query(query,function(err,rows){
			if (err) 
			{
				console.log("ERROR: " + err.message);
			}
			else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_list',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'No Results found !! Please Try Again',back:'index'});
				}
			
		}
		});	//connection.end();
		dataPool.returnConnection(connection);
};


exports.bid=function(req,res){

var connection = dataPool.getConnection();		
var productId= req.param('productId');
req.session.productId=productId;

		var query = "SELECT * from product INNER JOIN Auction ON product.productId=Auction.productId where validity=1 AND product.productId ='"+productId+"'";
		
		console.log(query); 
		connection.query(query,function(err,rows){
			if (err) 
			{
				console.log("ERROR: " + err.message);
			}
			else
		{
			if(rows.length>0)
				{
				console.log("DATA : "+JSON.stringify(rows));
				res.render('product_bid',{ title:
					'product details' ,rows:rows},function(err, result) {
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
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'This product is not available for auction',back:'index'});
				}
			
		}
		});	//connection.end();
		dataPool.returnConnection(connection);
};

exports.placeBid=function(req,res){

var connection = dataPool.getConnection();
var productId= req.session.productId;
var currentPrice=req.param('currentPrice');
var buyerId=req.session.ssn;

		
		var query = "SELECT * from Auction where productId ='"+productId+"'";
		console.log(query);
		connection.query(query,function(err,rows){
		if (err)
			{
				console.log("ERROR: " + err.message);
			}
			else
			{
			if(rows.length>0)
				{
				var sellerId=rows[0].sellerId;
				var quantity=rows[0].quantity;
				var basePrice=rows[0].basePrice;
				var increment=rows[0].increment;
				var category=rows[0].category;
				var validity=0;
				var endTime=rows[0].endTime;

				var query1 = "INSERT INTO Auction(sellerId,quantity,basePrice,productId,increment,category,validity,endTime,currentPrice,buyerId) VALUES('" + sellerId + "','" +quantity + "','"  + basePrice + "','" + productId + "','" + increment + "','" + category+"','" + validity +"','" + endTime+ "','" + currentPrice+"','" + buyerId+"')";
				console.log(" Inside addAunction: "+query1);
				connection.query(query1,function(err1,results){
				if (err)
					{
						console.log("ERROR: " + err1.message);
					}
					else
					{
						res.render('error',{ title:
			'Succesful!! ' ,message: 'Successfully added to the auction',back:'valid'});
					}});
				}
			
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'This product is not available for auction',back:'index'});
				}
			
		}
		});	//connection.end();
		
		dataPool.returnConnection(connection);
};

exports.viewBidInfo=function(req,res){
var connection = dataPool.getConnection();
var productId= req.session.productId;


		
		var query = "SELECT * from product INNER JOIN Auction ON product.productId=Auction.productId where validity=0 AND product.productId ='"+productId+"'";
		console.log(query);
		connection.query(query,function(err,rows){
		if (err)
			{
				console.log("ERROR: " + err.message);
			}
			else
			{
			if(rows.length>0)
				{
					res.render('displayBid',{ title:
					'Bid details' ,rows:rows},function(err, result) {
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
			
			else
				{
					res.render('error',{ title:
					'No results found !! ' ,message: 'This product is not available for auction',back:'index'});
				}
			
		}
		});	//connection.end();
		
		dataPool.returnConnection(connection);
};


