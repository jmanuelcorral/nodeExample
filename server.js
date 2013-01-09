var http = require("http");
var url = require("url");

function onError (error, response) {
	console.log("error: " + error.message);
	response.writeHead(503, {"Content-Type": "text/html"});
	response.write("<h1>503 Server Error</h1>");
	response.write("<p>" + error.message +"</p>");
	response.end();
}

function init(route, handle, errors)
{
	function onRequest(request, response) {
		request.setEncoding("utf8");
		var pathname = url.parse(request.url).pathname;
		console.log("Request method: ", request.method);
		var form_data = "";
		request.on("data", function (chunk) {
			console.log("Getting chunk data: " + chunk);
			form_data += chunk;
		});

		request.on("end", function () {
			try	
			{
				route(handle, pathname, response, form_data, errors);
			}
			catch(ex)
			{
				onError(ex, response);
			}
		});

	}
		
	http.createServer(onRequest).listen(8888);
	console.log("App init");
	console.log("Server in http://127.0.0.1:8888")
}

exports.init = init;