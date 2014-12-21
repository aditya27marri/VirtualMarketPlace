/**
 * New node file
 */
var ejs=require("ejs");
var mysql=require("./mysql");

function displayReviews(req,res)
{

	var ssn=req.session.ssn;
	var getUser="select * from review where userId='"+ssn+"'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var reviews=[];
				var ratings=[];
				for(var i=0;i<results.length;i++)
				{
					ratings[i]=results[i].rating;
					reviews[i]=results[i].review;


				}


				//console.log(one);
				console.log("valid Seller");
				ejs.renderFile('./views/addreview.ejs',{ratings:ratings,reviews:reviews},function(err, result) {

					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
							res.render('error',{ title:
			'Unable to Update !! ' ,message: 'Could not find any reviews for the seller ! Try again',back:'displayReviews'});
						console.log(err);
					}
				});
			}
			else {    
				console.log("Invalid Seller");
				ejs.renderFile('./views/fail.ejs',{msg:"No Ratings are ther please add your ratings"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.render('error',{ title:
			'Unable to Update !! ' ,message: 'Could not update your account ! Try again',back:'displayReviews'});
						console.log(err);
					}
				});
			}
		}  
	},getUser);

}
function addReviews(req,res)
{
	var userId=req.session.ssn;
	var ratings=parseInt(req.param("rangeinput"));
	var reviews=req.param("reviewsinput");


	//var getUser="insert into review (userId,rating,description) values ('44444949',5,'He is a very good seller');";
	var insertData1='INSERT INTO review SET ?';
	//consolen.log("Query is:"+firstname+lastname+emailid+password);
	var post1 = {
			userId : userId,
			rating: ratings,
			review : reviews

	};

	mysql.insertData(function(err,results){


		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows > 0){
				//console.log(results);
				console.log("valid Login");
				//var logintime=JSON.stringify(results[2]);
				//var one=results[0].logintime;

				ejs.renderFile('./views/addreviewSuccess.ejs',{msg:"Reviews Added Succesfully"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.render('error',{ title:
			'Unable to add reviews !! ' ,message: 'Could add your reviews ! Try again',back:'displayReviews'});
						console.log(err);
					}
				});
			}
			else {    

				console.log("Invalid Login");
				ejs.renderFile('./views/addreviewSuccess.ejs',{msg:"Reviews are not added"},function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						res.render('error',{ title:
			'Unable to add reviews !! ' ,message: 'Could add your reviews ! Try again',back:'displayReviews'});
						console.log(err);
					}
				});
			}
		}  
	},insertData1,post1);

}

exports.displayReviews=displayReviews;
exports.addReviews=addReviews;
