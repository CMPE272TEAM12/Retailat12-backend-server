var ejs = require("ejs");
var mysql = require("../controllers/mysql");
//var password = require('password-hash-and-salt');
var crypto = require('crypto');



function handle_login_request(msg, callback){	
	var res = {};
	var userID ;
	var getUser = "SELECT employeename FROM Inventory_system.employee where employeecode='"+msg.empcode+"';";
	//console.log("Query Login Log : " + getUser);
	
//	var salt = crypto.randomBytes(128).toString('base64');
//	console.log("Salt: "+ salt);
	
//	crypto.pbkdf2(msg.password, salt, 10000, 64, function(err, derivedKey) {
//		getUserQuery = "update persons_table set password = '"+derivedKey+"' where person_ssn=111;"; 
//	    console.log("Derived Key : "+ getUserQuery);
//	    //next();
//	    var newkey = derivedKey;
//	    if(derivedKey == newkey)
//	    {
//	    	console.log("password success.........");
//	    }
//	    
	    mysql.fetchData(function(err,results){
			if(err) {
				res.code = "503";
				res.Message = "Database Connection issue";
				callback(null, res);
			} else {
				if((results.length > 0))
				{
					res.code = "200";
					res.value = "Success";
					res.error = "none";
					res.status = true;
					//res.resultsData = results[0];
					//console.log("valid login" + results[0]);	
					
					callback(null, res);
			
				}		
			}
		}, getUser);	
	    
	//});
	
	//console.log("Derived Key outt  : "+ getUserQuery);
	/*mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if((results.length > 0)){
					//login = JSON.stringify(results);
					
					// Values for error or Success
					res.code = "200";
					res.value = "Success";
					res.error = "none";
					res.status = true;
					res.login = results[0];
					console.log("valid login" + results[0]);	
					
					callback(null, res);
			} else {
				
				res.code = "401";
				res.value = "User not Valid";
				console.log("Invalid Login");
				callback(null, res);
			}		
		}
	}, getUserQuery);	*/
}

exports.handle_login_request = handle_login_request;