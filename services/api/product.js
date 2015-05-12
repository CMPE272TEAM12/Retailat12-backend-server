var utility = require('../utility/utility');

exports.handle_add_product = handle_add_product;
exports.handle_update_product = handle_update_product;
exports.handle_sold_product = handle_sold_product;
exports.handle_get_product = handle_get_product;

function handle_get_product(msg,callback){
	var getProductQuery = "call proc_getProduct";
	
	utility.getDataExecuteQuery(getProductQuery,callback,"No Product available");
}

function handle_add_product(msg,callback){
	
	var addProductQuery = "call proc_addUpdateProduct";
	
	utility.postDataExecuteQuery(addProductQuery,callback,"Product is not added.");
}

function handle_update_product(msg,callback){
	
	var addProductQuery = "call proc_addUpdateProduct";
	
	utility.postDataExecuteQuery(addProductQuery,callback,"Product is not updated.");
}

function handle_sold_product(msg,callback){
	
	var soldProductQuery = "call proc_soldProduct";
	
	utility.postDataExecuteQuery(soldProductQuery,callback,"Product sold not updated.");
}