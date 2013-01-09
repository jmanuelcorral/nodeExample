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

		var form_data = "";
		request.on("data", function (data) {
			console.log("Getting chunk data: " + data);
			form_data += data;
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