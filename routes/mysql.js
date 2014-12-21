var ejs= require('ejs');
var mysql = require('mysql');
var sessionPool = [];

function connect(){
	var connection =  mysql.createConnection({
	  	host:'localhost',
	  	port:'3306',
	  	user:'root',
	  	password:'',
	  	database:'VirtualMarketPlace'	
	});
	connection.connect();
	return connection;
}

function initializepool(connections)
{
	for (var i = 0; i < connections; i++)
	{
		sessionPool.push(connect());
	}
}

function getConnection()
{
	console.log(sessionPool.length);
	if(sessionPool.length >=1 )
	{
		return sessionPool.pop();
	}
}

function returnConnection(connection)
{
	sessionPool.push(connection);
}




function getData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	 connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, rows);
		}
	});
	returnConnection(connection);
}
function putData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, results) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			callback(err, results);
		}
	});
	returnConnection(connection);
}

exports.getData=getData;
exports.putData=putData;
exports.initializepool = initializepool;
exports.getConnection = getConnection;
exports.returnConnection = returnConnection;
