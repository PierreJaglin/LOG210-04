function respond(response, code, status, success, message) {
  response.statusCode = code;
  response.statusMessage = status;
  response.send({
    success: success,
    message: message
  });

  return response;
}

function badRequest(response, message) {
  console.log("BAD REQUEST : " + message);
  return respond(response, 400, "Bad request", false, message);
}

function serverError(response, message) {
  console.log("SERVER ERROR : " + message);
  return respond(response, 500, "Server error", false, message);
}

function okRequest(response, message) {
  return respond(response, 200, "OK", true, message);
}

module.exports = {
  badRequest,
  serverError,
  okRequest
};
