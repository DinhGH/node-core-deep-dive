const bcrypt = require("bcryptjs");
const userService = require("./service.js");
const {
  createRefreshToken,
  createAccessToken,
  verifyRefreshToken,
} = require("./jwt.js");
const { sql } = require("./db.js");

exports.getAllUser = async (req, res, next) => {
  try {
    const data = await userService.getAllUserService();
    return res.status(200).json({
      status: "success",
      message: "Lay tat ca user thanh cong",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const checkEmail = await userService.checkEmail(email);
    if (checkEmail.length > 0) {
      const err = new Error("Email da ton tai!");
      err.statusCode = 400;
      return next(err);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const data = await userService.register(username, email, passwordHash);
    console.log(data);
    res.status(201).json({
      status: "success",
      message: "Register successfully!",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await userService.login(username);
    if (!data) {
      throw new Error("Username khong chinh xac!");
    }
    const match = await bcrypt.compare(password, data.password);
    if (!match) {
      throw new Error("Password khong chinh xac!");
    }
    const payload = { id: data.id, email: data.email };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    await new sql.Request()
      .input("id", sql.Int, data.id)
      .input("refresh_token", sql.NVarChar, refreshToken)
      .query("update users set refresh_token=@refresh_token where id=@id");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });
    console.log("Cookie set:", refreshToken);
    return res.status(200).json({
      status: "success",
      message: "Dang nhap thanh cong",
      data: [
        { id: data.id, username: data.username, email: data.email },
        accessToken,
      ],
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ status: "fail", message: "Thieu refresh token" });
    }
    const decode = verifyRefreshToken(refreshToken);
    const newAccessToken = createAccessToken({
      id: decode.id,
      email: decode.email,
    });
    return res.status(200).json({
      status: "success",
      message: "Lay access token thanh cong",
      newAccessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};
