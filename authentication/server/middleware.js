exports.errorHandling = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error("🔥 Error Logged:", err.message);
  res.status(statusCode).json({
    status: statusCode >= 500 ? "error" : "fail",
    message: err.message || "Internal Server Error",
    // Chỉ hiển thị stack trace ở môi trường dev để bảo mật
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
