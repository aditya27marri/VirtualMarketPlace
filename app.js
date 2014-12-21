var express = require('express')
, routes = require('./routes')
, category = require('./routes/category')
, user = require('./routes/user')
, sell = require('./routes/sell')
, buy = require('./routes/buy')
, reviews = require('./routes/reviews')
, account = require('./routes/accounts')
, http = require('http')
,product = require('./routes/product')
,addCart = require('./routes/addToCart')
,admin = require('./routes/admin')
  ,account = require('./routes/accounts')
  ,myProducts = require('./routes/myProducts')
, path = require('path');

var dataObject = require('./routes/ConnectionPooling');
var objectControl= require('./routes/ControlCenter');
var app = express();
var favicon = require('serve-favicon');
var poolNum=10;
app.use(express.cookieParser());
app.use(express.session({secret: 'VirtualMarketPlace'}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(path.join(__dirname, 'public','image','favicon.gif')));


var dataObject = require('./routes/ConnectionPooling');
var objectControl= require('./routes/ControlCenter');
var app = express();
var favicon = require('serve-favicon');
var poolNum=10;
app.use(express.cookieParser());
app.use(express.session({secret: 'VirtualMarketPlace'}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(path.join(__dirname, 'public','image','favicon.gif')));

app.use(express.favicon());
dataObject.setPool(poolNum);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);

/*app.get('/addCategory', category.addCategory);
app.get('/deleteCategory', category.deleteCategory);*/

app.get('/login', user.login);
app.get('/security', user.security);
app.get('/valid', user.valid);
app.post('/validateSignin', user.validate);
app.get('/signup', user.signup);
app.post('/register', user.register);
app.get('/sell', user.sell);
app.get('/resetPassword', user.resetPassword);
app.get('/updatePassword', user.updatePassword);
app.post('/securityQuestion', user.securityQuestion);
app.post('/renewPassword', user.renewPassword);
app.post('/resetPwd', user.resetPwd);

app.get('/selling', user.selling);
app.get('/auction', user.auction);
app.get('/signout', user.signout);
app.post('/addAuction', sell.addAuction);
app.post('/addSelling', sell.addSelling);


app.get('/bid', buy.bid);
app.post('/placeBid', buy.placeBid);
app.get('/viewBidInfo', buy.viewBidInfo);

app.get('/search', buy.search);
app.get('/Electronics', buy.electronics);
app.get('/clothes', buy.clothes);
app.get('/Luggage', buy.luggage);
app.get('/movies', buy.movies);
app.get('/auto-mobiles', buy.automobiles);
app.get('/other', buy.other);

app.get('/displayReviews',reviews.displayReviews);
app.post('/addReviews',reviews.addReviews);
app.get('/displayUpdateAccount',account.displayUpdateAccount);
app.post('/updateAccount',account.updateAccount);
app.post('/deleteAccount',account.deleteAccount);

app.get('/orderHistory',account.orderHistory);

app.get('/adminlogin', admin.login);
app.post('/adminvalidateSignin', admin.validate);
app.get('/DeleteUsers', admin.deleteUsers);
app.get('/deleteUserSsn/:id',function(req,res){
	admin.deleteUserSsn(req,res,req.param('id'));
});
app.get('/DeleteProducts', admin.deleteProducts);
app.get('/deleteProductId/:id',function(req,res){
	admin.deleteProductId(req,res,req.param('id'));
});
app.get('/DeleteAuctions', admin.deleteAuctions);
app.get('/deleteAuctionId/:id',function(req,res){
	admin.deleteAuctionId(req,res,req.param('id'));
});


app.get('/updateUserProduct/:id',function(req,res){
	myProducts.getProducts(req,res,req.param('id'));
});
app.post('/updateSelling/:id',function(req,res){
	myProducts.updateSelling(req,res,req.param('id'));
});

app.get('/showcart', addCart.showcart);
app.get('/addToCart/:id', function(req,res){
	addCart.addToShoppingCart(req,res,req.param('id'));
});
app.get('/deleteProductFromCart/:cartId', function(req,res){
	addCart.deleteProductFromCart(req,res,req.param('cartId'));
});
app.get('/myProducts',myProducts.myProducts);

//product call
app.get('/product/:id',function(req,res){
	product.productDetails(req,res,req.param('id'));
});
app.get('/Usersearch',buy.Usersearch);


app.get('/searchUser',user.searchUser)
app.post('/checkOut',checkout.checkOut);
app.post('/toPay',checkout.toPay);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


