/**
 * New node file
 */
var ejs=require("ejs");
var mysql=require("./mysql");	

function displayUpdateAccount(req,res)
{

	var ssn=req.session.ssn;
	var getUser="select * from userDetails where ssn='"+ssn+"'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var firstName,lastName,email,password,address,zipCode,city,state,accountDetails,ssn;
				/*			for(var i=0;i<results.length;i++)
					{
						 ratings[i]=results[i].rating;
						 reviews[i]=results[i].review;


					}
				 */
				firstName=results[0].firstName;
				lastName=results[0].lastName;
				email=results[0].email;
				password=results[0].password;
				address=results[0].address;
				zipCode=results[0].zipCode;
				city=results[0].city;
				state=results[0].state;
				accountDetails=results[0].accountDetails;
				ssn=results[0].ssn;

				//console.log(one);
				console.log("valid Seller");
				console.log(firstName,lastName);
				ejs.renderFile('./views/accountUpdate.ejs',{firstName:firstName,lastName:lastName,email:email,password:password,address:address,zipCode:zipCode,city:city,state:state,accountDetails:accountDetails,ssn:ssn},function(err, result) {

					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
							res.render('error',{ title:
			'Unable to Update !! ' ,message: 'Could not update your account ! Try again',back:'displayUpdateAccount'});
						console.log(err);
					}
				});
			}
			else {    
				console.log("Invalid Seller");
				ejs.renderFile('./views/successMsg.ejs',{msg:"Updates are not availbale for this seller"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
					
							res.render('error',{ title:
			'Unable to Update !! ' ,message: 'Could not update your account ! Try again',back:'displayUpdateAccount'});
						console.log(err);
					}
				});
			}
		}  
	},getUser);

}
function updateAccount(req,res)
{



	var firstName=req.param("firstname");
	var lastName=req.param("lastname");
	var email=req.param("Email-id");
	var address=req.param("address");
	var zipCode=req.param("zipCode");
	var city=req.param("city");
	var state=req.param("state");
	var accountDetails=req.param("accountDetails");
	var password=req.param("pass2");
	var ssn=req.session.ssn;

	var updatetData="update userDetails set firstName='"+firstName+"'"+",lastName= '"+lastName+"'"+",email='"+email+"'"+",password='"+password+"'"+",address='"+address+"'"+",zipCode='"+zipCode+"'"+",city='"+city+"'"+",state='"+state+"'"+",accountDetails='"+accountDetails+"'"+"where ssn="+"'"+ssn+"'";
	mysql.updateData(function(err,results){

		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows  > 0){
				console.log("valid Login");
				var succ="User Account Details Update";
				ejs.renderFile('./views/successMsg.ejs',{msg:succ,email:req.session.email,lastlogin:req.session.lastlogin},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
									res.render('error',{ title:
			'Unable to Update !! ' ,message: 'Could not update your account ! Try again',back:'updateAccount'});
						console.log(err);
						console.log(err);
					}
				});
			}
			else {    

				console.log("Invalid Login");
				ejs.renderFile('./views/successMsg.ejs',{msg:"update failed"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
							res.render('error',{ title:
						'Unable to Update !! ' ,message: 'Could not update your account ! Try again',back:'updateAccount'});
						console.log(err);
					}
				});
			}
		}  
	},updateData);
}

	function deleteAccount(req,res)
	{





		var ssn=req.session.ssn;

		var deleteData="Delete from userDetails where ssn='"+ssn+"'";
		mysql.deleteData(function(err,results){



			if(err){
				throw err;
					}
			else 
			{
				if(results.affectedRows  > 0){
					console.log("valid Login");
					var succ="Deleted category ";
					ejs.renderFile('./views/successMsg.ejs',{msg:"Account Deleted Successfully"},function(err, result) {
						// render on success
						if (!err) {
							res.end(result);
						}
						// render or error
						else {
								res.render('error',{ title:
						'Unable to Delete account !! ' ,message: 'Could not delete your account ! Try again',back:'deleteAccount'});
							console.log(err);
						}
					});
				}
				else {    

					console.log("Invalid Login");
					ejs.renderFile('./views/successMsg.ejs',{msg:"Nothing to delete"},function(err, result) {
						// render on success
						if (!err) {
							res.end(result);
						}
						// render or error
						else {
							res.render('error',{ title:
						'Unable to Delete account !! ' ,message: 'Could not delete your account ! Try again',back:'deleteAccount'});
							console.log(err);
						}
					});
				}
			}  
		},deleteData);
	}

	function orderHistory(req,res)
	{

		var ssn=req.session.ssn;

		var selectData="Select * from History where userId='"+ssn+"'";
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					var itemsSold=[];
					var itemsBought=[];
					for(var i=0;i<results.length;i++)
					{
						itemsSold[i]=results[i].itemsSold;
						itemsBought[i]=results[i].itemsBought;


					}


					//console.log(one);
					console.log("History Available");
					ejs.renderFile('./views/history.ejs',{itemsSold:itemsSold,itemsBought:itemsBought},function(err, result) {

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
				else {    
					console.log("Invalid Seller");
					ejs.renderFile('./views/fail.ejs',{msg:"No history is available for the particular user"},function(err, result) {
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
			}  



		},selectData);
	}
	
exports.deleteAccount=deleteAccount;
exports.displayUpdateAccount=displayUpdateAccount;
exports.updateAccount=updateAccount;
exports.orderHistory=orderHistory;
