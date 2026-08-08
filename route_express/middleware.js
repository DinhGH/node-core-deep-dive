exports.logRequest = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] - ${req.method} - ${req.url}`);
  next();
};

exports.timeRequest = (req, res, next) => {
  const start = Date.now();
  console.log(req.url); ///api/users/1u?id=2
  res.on("finish", () => {
    //dang ky 1 callback chay khi ket thuc response. do vay luc nay url da cat bot de chay dung voi route.
    const end = Date.now();
    console.log(`${req.method}  ${req.url} - ${end - start}`); ///1u?id=2
  });
  next();
};

exports.validateUserData = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: "Fail", message: "Email can not null" });
    // neu vi du cho nay ko co return, thi email = null no se in ra loi
    // Cannot set headers after they are sent to the client. vi gui xong cai nay, no gui tiep cai duoi
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "Fail",
      message: "Định dạng Email không hợp lệ!",
    });
  }
  next();
};

exports.checkuserid = (req, res, next) => {
  const { id } = req.query;
  if (Number(id) === 0) {
    const err = new Error("User id must not be 0");
    err.statusCode = 400;
    return next(err);
  }
  next();
};

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
