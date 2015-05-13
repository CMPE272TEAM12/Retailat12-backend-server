var utility = require('../utility/utility');

exports.handle_add_employee = handle_add_employee;
exports.handle_get_employee = handle_get_employee;
exports.handle_employee_intime = handle_employee_intime;
exports.handle_employee_outtime = handle_employee_outtime;
exports.handle_employee_instore = handle_employee_instore;


function handle_get_employee(msg,callback){
	
	var getEmployeeQuery = "call proc_getEmployees(2)";
	
	utility.getDataExecuteQuery(getEmployeeQuery,callback,"Employee list is not available.");
}

function handle_add_employee(msg,callback){
	
	var addEmployeeQuery = "call proc_addEmployee('"+msg.empName+"',"+2+","+msg.empCode+",'"+msg.empAddress+"','"+msg.empState+"',"+msg.empZipCode+","+msg.empPhone+");";
	
	utility.postDataExecuteQuery(addEmployeeQuery,callback,"Employee is not added.");
}


function handle_employee_intime(msg,callback){
	
	var empInTimeQuery = "call proc_employeeInTime("+msg.empCode+");"
	
	utility.getDataExecuteQuery(empInTimeQuery,callback,"Employee intime not added.");
}

function handle_employee_outtime(msg,callback){
	
	var empOutTimeQuery = "call proc_employeeOutTime("+msg.empCode+");"
	
	utility.getDataExecuteQuery(empOutTimeQuery,callback,"Employee outtime not added.");
}

function handle_employee_instore(msg,callback){
	var empInStoreQuery = "call proc_inStoreEmployee(2)";
	
	utility.getDataExecuteQuery(empInStoreQuery,callback,"No employee is in store.");
}