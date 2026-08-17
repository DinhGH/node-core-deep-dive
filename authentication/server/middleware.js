const { verifyAccessToken } = require("./jwt");

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

exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "fail", message: "Vui long dang nhap!" });
    }
    const token = authHeader.split(" ")[1];
    const decode = verifyAccessToken(token); //neu accesstoken luu o localstorage
    next();
  } catch (err) {
    res
      .status(401)
      .json({ status: "fail", message: "Token khong hop le hoac het han" });
  }
};
