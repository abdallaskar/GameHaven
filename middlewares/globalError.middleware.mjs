export function globalErrorHandler(err, req, res, next) {
  console.error("Error:", err); 

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.stack
  });
}
