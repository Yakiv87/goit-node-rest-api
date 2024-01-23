const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
}
class HttpError {
    constructor(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  export { HttpError };