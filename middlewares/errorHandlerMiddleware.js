import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleWare = (err, req, res, next) => {
  console.log(err.message);
  const statusCode = err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong, please try again later";

  res.status(statusCode).json({ message: message });
};

export default errorHandlerMiddleWare;
