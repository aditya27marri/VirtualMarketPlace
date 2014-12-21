/**
 * New node file
 */
var mysql=require("mysql");
var dataObject = require('../routes/ConnectionPooling');
var objectControl= require('../routes/ControlCenter');

exports.addAuction = function(req, res){
	var product=req.param('product');
	var productType=req.param('productType');
	var category=req.param('category');
	var quantity=req.param('quantity');
	var brand=req.param('brand');
	var state=req.param('state');
	var model=req.param('model');
	var description=req.param('description');
	var basePrice=req.param('basePrice');
	var increment=req.param('increment');
	var endTime=req.param('endTime');
	var imageName;
	var flag=0;
	{
		var re = /([A-Za-z]).{1,100}$/;
		var re1 = /([0-9])+$/;
	    if(!re.test(product))
	    	{
	    		flag=1;
	    	}

	    if(!re.test(productType))
	    	{
	    		flag=2;
	    	}
	    if(!re.test(category))
	    	{
	    		flag=3;
	    	}
	    if(!re1.test(quantity))
	    	{
	    		flag=4;
	    	}
	    if(!re.test(brand))
	    	{
	    		flag=5;
	    	}
	    if(!re.test(state))
	    	{
	    		flag=6;
	    	}
	    if(!re.test(model))
	    	{
	    		flag=7;
	    	}
	    if(!re.test(description))
	    	{
	    		flag=8;
	    	}
	    if(!re1.test(basePrice))
	    	{
	    		flag=9;
	    	}
	    if(!re1.test(increment))
	    	{
	    		flag=10;
	    	}
	    if(!re.test(endTime))
	    	{
	    		flag=11;
	    	}
			    
	}
	if(product===null || product==='' || flag===1)
	{
		res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Please enter a valid Product',back:'auction'});
	}
	else if(productType===null || productType==='' || flag===2)
	{
		console.log('productType is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid product Type',back:'auction'});
	}
	else if((category===null || category==='' || flag===3 ))
	{
		console.log('Category is incorrect');
		res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Please enter a valid category',back:'auction'});
	}
	else if((quantity===null || quantity==='' || flag===4 ))
	{
		console.log('Quantity is incorrect');
		res.render('error',{ title:
			'Unable to add Product !!' ,message: 'Please enter a valid quantity',back:'auction'});
	}
	else if((brand===null || brand==='' || flag===5 ))
	{
		console.log('Brand is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid brand',back:'auction'});
	}
	else if((state===null || state==='' || flag===6 ))
	{
		console.log('State is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid State',back:'auction'});
	}
	else if((model===null || model==='' || flag===7 ))
	{
		console.log('Category is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid model',back:'auction'});
	}
	else if((description===null || description==='' || flag===8 ))
	{
		console.log('Description is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid description',back:'auction'});
	}
	else if((basePrice===null || basePrice==='' || flag===9 ))
	{
		console.log('Base Price is incorrect');
		res.render('error',{ title:
			'Unable to add Auction !! ' ,message: 'Please enter a valid base price',back:'auction'});
	}
	else if((increment===null || increment==='' || flag===10 ))
	{
		console.log('Increment is incorrect');
		res.render('error',{ title:
			'Unable to add Auction !! ' ,message: 'Please enter a valid increment',back:'auction'});
	}
	else if((endTime===null || endTime==='' || flag===11 ))
	{
		console.log('EndTime is incorrect');
		res.render('error',{ title:
			'Unable to add Auction !! ' ,message: 'Please enter a valid endTime',back:'auction'});
	}
	else
	{
		if(category==='Electronics')
		{
			imageName='http://bigelectronics.net/images/art/consumer-electronics.jpg';
		}
		else if(category==='Clothes')
		{
			imageName='http://2.bp.blogspot.com/-tblXIcluIv0/UJORNWxW-4I/AAAAAAAAF-U/bVWyiNQ4q84/s1600/creative-nike-t-shirts.jpg';
		}
		else if(category==='Luggage')
		{
			imageName='http://wallpapersmap.com/wp-content/uploads/2013/05/travel-luggage.jpg';
		}
		else if(category==='Movies')
		{
			imageName='http://www.androidguys.com/wp-content/uploads/2012/03/amc_theaters_feature.png';
		}
		else if(category==='AutoMobiles')
		{
			imageName='http://www.hdwallpapersinn.com/wp-content/uploads/2014/10/New-Sports-Cars-Supercars-HD-Wallpaper-HD-Wallpapers-Desktop.jpg';
		}
		else
		{
			imageName='http://i24.photobucket.com/albums/c28/novamelissah/DIY%20DVD%20Shelf%20Project/DIYDVDShelfProject-1_zpscb7a7d7a.jpg';
		}
		
		objectControl.addProduct(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Unable to add product. Try again',back:'auction'});
			}
			else
			{
					console.log(" Product sucessfully added");
			}
		},productType,category,quantity,brand,state,model,description,product,imageName);

		objectControl.getProductId(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Unable to add product. Try again',back:'auction'});
			}
			else
			{
					req.session.productId=results[0].lastid;
					console.log(" ProductId is: "+req.session.productId);
			objectControl.addAuction(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Unable to add product. Try again',back:'auction'});
			}
			else
			{
					console.log(" Product sucessfully added to Auction");
			}
			},req.session.ssn,quantity,basePrice,req.session.productId,increment,category,endTime);
		 }
		});

		
	
	objectControl.updateSellingHistory(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to update Seller !! ' ,message: 'Unable to add product. Try again',back:'selling'});
			}
			else
			{
			res.render('error',{ title:
			'Success!! ' ,message: 'Updated successfully. Your product is placed to be sold',back:'valid'});
					console.log(" Seller updated");
			}
		},req.session.ssn,product);


	}
};

exports.addSelling = function(req, res){
	var product=req.param('product');
	var productType=req.param('productType');
	var category=req.param('category');
	var quantity=req.param('quantity');
	var brand=req.param('brand');
	var state=req.param('state');
	var model=req.param('model');
	var description=req.param('description');
	var price=req.param('price');
	var flag=0;
	{
		var re = /([A-Za-z]).{1,100}$/;
		var re1 = /([0-9])+$/;
	    if(!re.test(product))
	    	{
	    		flag=1;
	    	}

	    if(!re.test(productType))
	    	{
	    		flag=2;
	    	}
	    if(!re.test(category))
	    	{
	    		flag=3;
	    	}
	    if(!re1.test(quantity))
	    	{
	    		flag=4;
	    	}
	    if(!re.test(brand))
	    	{
	    		flag=5;
	    	}
	    if(!re.test(state))
	    	{
	    		flag=6;
	    	}
	    if(!re.test(model))
	    	{
	    		flag=7;
	    	}
	    if(!re.test(description))
	    	{
	    		flag=8;
	    	}
	    if(!re1.test(price))
	    	{
	    		flag=9;
		}
			    
	}
	if(product===null || product==='' || flag===1)
	{
		res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Please enter a valid Product',back:'selling'});
	}
	else if(productType===null || productType==='' || flag===2)
	{
		console.log('productType is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid product Type',back:'selling'});
	}
	else if((category===null || category==='' || flag===3 ))
	{
		console.log('Category is incorrect');
		res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Please enter a valid category',back:'selling'});
	}
	else if((quantity===null || quantity==='' || flag===4 ))
	{
		console.log('Quantity is incorrect');
		res.render('error',{ title:
			'Unable to add Product !!' ,message: 'Please enter a valid quantity',back:'selling'});
	}
	else if((brand===null || brand==='' || flag===5 ))
	{
		console.log('Brand is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid brand',back:'selling'});
	}
	else if((state===null || state==='' || flag===6 ))
	{
		console.log('State is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid State',back:'selling'});
	}
	else if((model===null || model==='' || flag===7 ))
	{
		console.log('Category is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid model',back:'selling'});
	}
	else if((description===null || description==='' || flag===8 ))
	{
		console.log('Description is incorrect');
		res.render('error',{ title:
			'Unable to add Product !! ' ,message: 'Please enter a valid description',back:'selling'});
	}
	else if((price===null || price==='' || flag===9 ))
	{
		console.log('Base Price is incorrect');
		res.render('error',{ title:
			'Unable to add product for Selling !! ' ,message: 'Please enter a valid base price',back:'selling'});
	}
	else
	{
		if(category==='Electronics')
		{
			imageName='http://bigelectronics.net/images/art/consumer-electronics.jpg';
		}
		else if(category==='Clothes')
		{
			imageName='http://mysterywallpaper.blogspot.com/2012/11/creative-nike-t-shirts.html';
		}
		else if(category==='Luggage')
		{
			imageName='http://wallpapersmap.com/wp-content/uploads/2013/05/travel-luggage.jpg';
		}
		else if(category==='Movies')
		{
			imageName='http://www.androidguys.com/wp-content/uploads/2012/03/amc_theaters_feature.png';
		}
		else if(category==='AutoMobiles')
		{
			imageName='http://www.hdwallpapersinn.com/wp-content/uploads/2014/10/New-Sports-Cars-Supercars-HD-Wallpaper-HD-Wallpapers-Desktop.jpg';
		}
		else
		{
			imageName='http://i24.photobucket.com/albums/c28/novamelissah/DIY%20DVD%20Shelf%20Project/DIYDVDShelfProject-1_zpscb7a7d7a.jpg';
		}
		objectControl.addProduct(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Unable to ad product. Try again',back:'selling'});
			}
			else
			{
					console.log(" Product sucessfully added");
			}
		},productType,category,quantity,brand,state,model,description,product,imageName);

		objectControl.getProductId(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to add product !! ' ,message: 'Unable to add product. Try again',back:'selling'});
			}
			else
			{
					req.session.productId=results[0].lastid;
					var productId=req.session.productId;
					console.log(" ProductId is: "+req.session.productId);

					objectControl.addSelling(function(err,results){
					if(err)
					{
					res.render('error',{ title:
					'Unable to add product !! ' ,message: 'Unable to ad product. Try again',back:'selling'});
					}
					else
					{
							console.log(" Product sucessfully added in selling");
					}
				},req.session.ssn,quantity,price,productId);
			}
		});


	
		objectControl.updateSellingHistory(function(err,results){
			if(err)
			{
			res.render('error',{ title:
			'Unable to update Seller !! ' ,message: 'Unable to add product. Try again',back:'selling'});
			}
			else
			{
			res.render('error',{ title:
			'Success!! ' ,message: 'Updated successfully. Your product is placed to be sold',back:'valid'});
					console.log(" Seller updated");
			}
		},req.session.ssn,product);


	}
};
