var amqp = require('amqp'), util = require('util');

var login = require('./services/api/login');
var logout = require('./services/api/logout');
var utility = require('./services/utility/utility');
var product = require('./services/api/product');
var cnn = amqp.createConnection({
	host : '127.0.0.1'
});

cnn.on('ready', function() {
	console.log("Server is Listening");

	cnn.queue('login_queue', function(q) { // For any new queue use this code
		// with appropriate values
		console.log("login_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m) {
			console.log("login_queue inside function");

			// Logs if necessary
			util.log(util.format(deliveryInfo.routingKey, message));
			util.log("Message: " + JSON.stringify(message));
			util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

			// If Using One queue for particular set of operation, using
			// message.type to differentiate request
			switch (message.type) {
			case "login":
				login.handle_login_request(message, function(err, res) {
					utility.publish_Reply(m, res);
				});
				break;

			case "logout":
				logout.handle_logout_request(message, function(err, res) {
					utility.publish_Reply(m, res);
				});
				break;
			}
		});
		cnn.queue('product_queue', function(q) { // For any new queue use this code
			// with appropriate values
			console.log("product_queue function");
			q.subscribe(function(message, headers, deliveryInfo, m) {
				console.log("product_queue inside function");

				// Logs if necessary
				util.log(util.format(deliveryInfo.routingKey, message));
				util.log("Message: " + JSON.stringify(message));
				util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));

				// If Using One queue for particular set of operation, using
				// message.type to differentiate request
				switch (message.type) {
				case "add":
					product.handle_add_product(message, function(err, res) {
						utility.publish_Reply(m, res);
					});
					break;

				case "update":
					product.handle_update_product(message, function(err, res) {
						utility.publish_Reply(m, res);
					});
					break;
					
				case "sold":
					product.handle_sold_product(message, function(err, res) {
						utility.publish_Reply(m, res);
					});
					break;
				
				case "get":
					product.handle_get_product(message, function(err, res) {
						utility.publish_Reply(m, res);
					});
					break;	
				}
			});
	});
});