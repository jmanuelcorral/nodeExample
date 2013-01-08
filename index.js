var server = require("./server");
var router = require("./router");
var requestHandlers = require("./request_handlers");

var handle = {}
handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/subir"] = requestHandlers.subir;

server.init(router.route, handle);