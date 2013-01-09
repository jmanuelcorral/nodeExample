var server = require("./server");
var router = require("./router");
var requestHandlers = require("./request_handlers");

var handle = {}
handle["/"] = requestHandlers.index;
handle["/index"] = requestHandlers.index;
handle["/upload"] = requestHandlers.upload;

var errors = {}
errors["404"] = requestHandlers.route_error;

server.init(router.route, handle, errors);