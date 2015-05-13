var utility = require('../utility/utility');
var mysql = require("../controllers/mysql");
var ejs = require("ejs");

exports.handle_add_product = handle_add_product;
exports.handle_update_product = handle_update_product;
exports.handle_sold_product = handle_sold_product;
exports.handle_get_product = handle_get_product;
exports.handle_get_lastweekproduct = handle_get_lastweekproduct;

function handle_get_lastweekproduct(msg,callback){
	var getLastWeekProductQuery = "call proc_itemsSoldLastWeek()";
	
	utility.getDataExecuteQuery(getLastWeekProductQuery,callback,"No Product available");
}

function handle_get_product(msg,callback){
	var getProductQuery = "call proc_getItems(2)";
	
	utility.getDataExecuteQuery(getProductQuery,callback,"No Product available");
}

function handle_add_product(msg,callback){
	
	var addProductQuery = "call proc_addUpdateProduct('"+msg.product_name+"',"+1+","+2+",'"+msg.product_code+"',"+msg.product_price+");";
	
	utility.postDataExecuteQuery(addProductQuery,callback,"Product is not added.");
}

function handle_update_product(msg,callback){
	
	var updateProductQuery = "call proc_addUpdateProduct('"+msg.product_name+"',"+1+","+2+",'"+msg.product_code+"',"+msg.product_price+");";
	
	utility.postDataExecuteQuery(updateProductQuery,callback,"Product is not updated.");
}

function handle_sold_product(msg,callback){
	console.log("Inside solde");
	var res={};
	var object = msg.itemList;
	console.log(object.length);
	
	for(var i=0;i<object.length;i++)
	{
		var soldProductQuery = "call proc_soldProduct(1,2,'"+object[i].Code+"');";
		console.log(soldProductQuery+"\n");
		mysql.fetchData(function(err,results){
			if(err)
				throw err;
			else{
				//console.log(object.length);
					if(i == object.length)
					{
						res.code = "200";
						res.value = "Success";
						res.error = "none";
						res.status = true;
					//res.resultsData = results[0];	
						callback(null, res);		
					}
				}
			},soldProductQuery);
		
	}

	
	
//	object1.forEach(function(object){
//		console.log(object+"----");
//	});
//	
//	res.code="200";
//	callback(null,res);
	//utility.postDataExecuteQuery(soldProductQuery,callback,"Product sold not updated.");
}




