/**
 * New node file
 */
//Connection pooling module. Uses a simple queue for maintaining a pool of connections.
var mysql = require('mysql');
var connectionPool = [];
var count=0;

function connect()
{
	var connection = mysql.createConnection({
		host     : 'projectdbinstance.c6ajdtfwubhe.us-west-2.rds.amazonaws.com',
		user     : 'awsadmin',
		password : 'cmpe273team5',
		port: '3306',
		database: 'VirtualMarketPlace'
	});

	connection.connect();

	return connection;
}

function setPool(numOfConn)
{
	count=numOfConn;
	for (var i = 0; i < numOfConn; i++)
	{
		connectionPool.push(connect());
	}
}

function getConnection()
{
	if(connectionPool.length >=1 )
	{
		return connectionPool.pop();
	}
}

function returnConnection(connection)
{
	
	
	connectionPool.push(connection);
	
}

exports.setPool = setPool;
exports.getConnection = getConnection;
exports.returnConnection = returnConnection;