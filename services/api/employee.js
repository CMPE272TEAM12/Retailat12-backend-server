var utility = require('../utility/utility');

exports.handle_add_employee = handle_add_employee;

function handle_add_employee(req,res){
	
	var addEmployeeQuery = "call proc_add";
	
	utility.postDataExecuteQuery(addEmployeeQuery,callback,"Employee is not added.");
}