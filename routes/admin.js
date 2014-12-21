/**
 * New node file
 */
var mysql=require("mysql");
var dataObject = require('../routes/ConnectionPooling');
var objectControl= require('../routes/ControlCenter');
var dataPool=require('../routes/ConnectionPooling');
var global_ssn;

exports.login = function(req, res){
res.render('adminlogin');
};

exports.validate = function(req, res){
	var email=req.param('email');
	var password=req.param('password');
	var flag=0;
	{
		//checks for email id
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(!re.test(email))
	    	{
	    		flag=1;
	    	}
	    //one character minimum, one numeric minimum. Wordlenght 4-20
	    var re1= /^(?=.*\d)(?=.*[a-zA-Z]).{4,20}$/;
	    if(!re1.test(password))
    	{
    		flag=2;
    	}
	    
	}
	if(email===null || email==='' || flag===1)
	{
		res.render('error',{ title:
			'Unable to signin !! ' ,message: 'Please enter a valid email id',back:'adminlogin'});
	}
	else if(password===null || password==='' || flag===2)
	{
		console.log('Password is Missing');
		res.render('error',{ title:
			'Unable to signin !! ' ,message: 'Please enter a valid password',back:'adminlogin'});
	}
	else if(email!='admin@ebay.com' || password!='adminlogin1')
	{
		console.log('admin only');
		res.render('error',{ title:
			'Unable to signin !! ' ,message: 'Only admin allowed to login here',back:'adminlogin'});
	}
	else
	{
		objectControl.validateEmailPassword(function(err,results){
			if(err)
			{
				res.render('error',{ title:
					'Unable to signin !! ' ,message: 'In-correct Username or Password for admin',back:'adminlogin'});
			}
			else
			{
				req.session.email = results[0].email;
				req.session.firstname = results[0].firstname;
				req.session.lastname = results[0].lastname;
				req.session.lastlogin = new Date();
				req.session.ssn = results[0].ssn;
				console.log(req.session.email);
				res.render('adminhome',{ title:
					'login' ,name:email,time:req.session.lastlogin});
			}
		},email,password);
	}
};

function deleteUsers(req,res)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var query = "SELECT * from userDetails";
	console.log("select userdetails: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			var email = req.session.email;
		        	res.render('deleteusers',{ title:
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
exports.deleteUserSsn = function(req,res,id)
{	var connection = dataPool.getConnection();
//var connection=connect();
var query = "delete from userDetails where ssn='"+id+"'";
console.log("delete from shoppingCart: "+query);
connection.query(query,function(err,results){
	if(err){
		throw err;
		console.log(err);
	}
	else{
		console.log("user deleted.");
		res.redirect('/deleteusers');
	}

});
	dataPool.returnConnection(connection);
}
function deleteProducts(req,res)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var query = "SELECT * from product";
	console.log("select products: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			var email = req.session.email;
		        	res.render('deleteProducts',{ title:
					'Products' ,rows:rows,name:email},function(err, result) {
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
exports.deleteProductId = function(req,res,id)
{	var connection = dataPool.getConnection();
//var connection=connect();
var query = "delete from product where productId='"+id+"'";
console.log("delete from shoppingCart: "+query);
connection.query(query,function(err,results){
	if(err){
		throw err;
		console.log(err);
	}
	else{
		console.log("user deleted.");
		res.redirect('/DeleteProducts');
	}

});
	dataPool.returnConnection(connection);
}
function deleteAuctions(req,res)
{
	var connection = dataPool.getConnection();
	//var connection=connect();
	var query = "SELECT * from Auction";
	console.log("select Auctions: "+query);
	connection.query(query,function(err,rows,fields){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
		{   console.log("DATA : "+JSON.stringify(rows));
			var email = req.session.email;
		        	res.render('deleteAuctions',{ title:
					'Auctions' ,rows:rows,name:email},function(err, result) {
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
exports.deleteAuctionId = function(req,res,id)
{	var connection = dataPool.getConnection();
//var connection=connect();
var query = "delete from Auction where productId='"+id+"'";
console.log("delete from shoppingCart: "+query);
connection.query(query,function(err,results){
	if(err){
		throw err;
		console.log(err);
	}
	else{
		console.log("user deleted.");
		res.redirect('/DeleteAuctions');
	}

});
	dataPool.returnConnection(connection);
}


exports.deleteUsers = deleteUsers;
exports.deleteProducts = deleteProducts;
exports.deleteAuctions = deleteAuctions;
