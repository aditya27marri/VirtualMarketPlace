/**
 * New node file
 */
var mysql=require("mysql");
var dataObject = require('../routes/ConnectionPooling');
var objectControl= require('../routes/ControlCenter');
var global_ssn;

exports.login = function(req, res){
res.render('login');
};

exports.signout = function(req, res){
req.session.destroy();

res.render('error',{ title:
	'Signed out !! ' ,message: 'Successfully Signed Out !',back:'index'});
};

exports.signup = function(req, res){
	res.render('signup');
};

exports.sell = function(req, res){
	res.render('sell',{title:'Sell Prooduct'});
};
exports.security = function(req, res){
	res.render('security');
};

exports.updatePassword = function(req, res){
	res.render('updatePassword');
};

exports.resetPassword = function(req, res){
	res.render('resetPassword');
};
	
exports.selling = function(req, res){
res.render('selling',{ title:
	'sell a product ',name:req.session.email,time:req.session.lastlogin});
};

exports.valid = function(req, res){
				res.render('home',{ title:
					'login' ,name:req.session.email,time:req.session.lastlogin});
	
};

		
exports.auction = function(req, res){
res.render('auction',{ title:
'Keep a product for auction',name:req.session.email,time:req.session.lastlogin});
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
			'Unable to signin !! ' ,message: 'Please enter a valid email id',back:'login'});
	}
	else if(password===null || password==='' || flag===2)
	{
		console.log('Password is Missing');
		res.render('error',{ title:
			'Unable to signin !! ' ,message: 'Please enter a valid password',back:'login'});
	}
	else
	{
		objectControl.validateEmailPassword(function(err,results){
			if(err)
			{
				res.render('error',{ title:
					'Unable to signin !! ' ,message: 'In-correct Username or Password',back:'login'});
			}
			else
			{
				req.session.email = results[0].email;
				req.session.firstname = results[0].firstname;
				req.session.lastname = results[0].lastname;
				req.session.lastlogin = new Date();
				req.session.ssn = results[0].ssn;
				console.log(req.session.email);
				res.render('home',{ title:
					'login' ,name:email,time:req.session.lastlogin});
			}
		},email,password);
	}
};

exports.register = function(req, res){
	var firstname=req.param('firstname');
	var lastname=req.param('lastname');
	var email=req.param('email');
	var ssn=req.param('ssn');
	var password=req.param('password');
	var confirm_password=req.param('confirm_password');
	var flag=0;
	{
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
	    var re2= /([a-zA-Z]).{1,35}$/;
	    if((!re2.test(firstname)) || (!re2.test(lastname)))
    	{
    		flag=3;
    	}
		if(password!==confirm_password)
		{
			flag=4;
		}
		var re3=/^\d{3}-\d{2}-\d{4}$/;
		if(!re3.test(ssn))
    	{
    		flag=5;
    	}
		
	    
	}
	if(email===null || email==='' || flag===1)
	{
		res.render('error',{ title:
			'Unable to signup !! ' ,message: 'Please enter a valid email id',back:'signup'});
	}
	else if(password===null || password==='' || flag===2)
	{
		console.log('Password is incorrect');
		res.render('error',{ title:
			'Unable to signup !! ' ,message: 'Please enter a valid password',back:'signup'});
	}
	else if((firstname===null || firstname==='') || flag===3 || (lastname===null || lastname===''))
	{
		console.log('Name is incorrect');
		res.render('error',{ title:
			'Unable to signup !! ' ,message: 'Please enter a valid name',back:'signup'});
	}
	else if(flag===4)
	{
		console.log('Passwords dont match');
		res.render('error',{ title:
			'Unable to signup !! ' ,message: 'Passwords should match',back:'signup'});
	}
	else
	{
		var time=new Date();
		console.log(" Inside Register");
		global_ssn=ssn;
		objectControl.createUser(firstname,lastname,email,password,ssn,time);
		res.render('security');
	}
};
exports.securityQuestion=function(req, res){
	var name=req.param('name');
	var flag=0;
	var re= /([a-zA-Z]).{1,35}$/;
    if(!re.test(name))
	{
		flag=1;
	}
    
    if(flag===1)
	{
		console.log('Invalid Name ');
		res.render('error',{ title:
			 'Unable to add security answer !! ' ,message: 'Invalid Name',back:'security'});
	}
	else
	{
		console.log(" Inside Security");
		objectControl.updateSecurity(name,global_ssn);
		res.render('login');
	}
	
};

exports.renewPassword=function(req, res){
	var name=req.param('name');
	var ssn=req.param('ssn');
	req.session.ssn=ssn;
	var flag=0;
	var re= /([a-zA-Z]).{1,35}$/;
    if(!re.test(name))
	{
		flag=1;
	}
    
    if(flag===1)
	{
		console.log('Invalid Name ');
		res.render('error',{ title:
			 'Unable to add security answer !! ' ,message: 'Invalid Name',back:'security'});
	}
	else
	{
		console.log(" Inside Validation of Security Quesion");
		objectControl.validateSecurity(function(err,results){
			if(err)
			{
				res.render('error',{ title:
					'Unable to Reset Password !! ' ,message: 'Incorrect Answer'});
			}
			else
			{
				res.render('updatePassword');
			}
		},name,req.session.ssn);
		
	}
	
};

exports.resetPwd = function(req, res){
	var password=req.param('password');
	var confirm_password=req.param('confirm_password');
	var flag=0;
	{
		var re1= /^(?=.*\d)(?=.*[a-zA-Z]).{4,20}$/;
	    if(!re1.test(password))
    	{
    		flag=1;
    	}
		if(password!==confirm_password)
		{
			flag=2;
		}
	}
	if(password===null || password==='' || flag===1)
	{
		console.log('Password is incorrect');
		res.render('error',{ title:
			'Unable to Change password !! ' ,message: 'Please enter a valid password',back:'resetPassword'});
	}
	else if(flag===2)
	{
		console.log('Passwords dont match');
		res.render('error',{ title:
			'Unable to Change Password !! ' ,message: 'Passwords should match',back:'resetPassword'});
	}
	else
	{
		objectControl.updatePassword(password,req.session.ssn);
		res.render('login');
	}
};
exports.error = function(req, res){
	res.render('error',{ title:
		email ,message: 'ok',back:'signup'});
};
