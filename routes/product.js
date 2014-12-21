/**
 * New node file
 */
var mysql=require('mysql');
var dataPool=require('../routes/ConnectionPooling');

/*function connect()
{
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'nishanth',
		port: '3306',
		database: 'yelp'
	});

	connection.connect();

	return connection;
}*/

function productDetails(req,res,id)
{
	
	var connection = dataPool.getConnection();
	
	var query = "SELECT * from product where productid='" + id + "'";
	
	console.log(query); 
	connection.query(query,function(err,rows){
		if (err) 
		{
			console.log("ERROR: " + err.message);
		}
		else
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

	});	//connection.end();
	dataPool.returnConnection(connection);
}
exports.search = function(req, res){
	res.send('Searching !!');
	};
exports.productDetails = productDetails;