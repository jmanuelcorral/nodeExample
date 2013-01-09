var querystring = require("querystring");

function index(response, formdata) {
	console.log("Handler Index");
 	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea id="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, formdata) {
	console.log("Handler Upload");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Tu enviaste el texto: " + querystring.parse(formdata)["text"]);
	response.end();
}

function route_error(pathname, response)
{
    console.log("Error, handler " + pathname + " not found");
   	response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 No encontrado");
    response.end();
}

exports.index = index;
exports.upload = upload;
exports.route_error = route_error;