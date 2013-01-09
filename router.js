function route(handle, pathname, response, formdata, errors) {
  console.log("Routing: " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, formdata);
  } else {
  	errors["404"](pathname, response);
  }
}

exports.route = route;