const { sql } = require("./db.js");

exports.register = async (username, email, passwordHash) => {
  const request = new sql.Request();
  const result = await request
    .input("username", sql.NVarChar, username)
    .input("email", sql.NVarChar, email)
    .input("password", sql.NVarChar, passwordHash)
    .query(
      `insert into users(username, email, password) values(@username,@email,@password)`,
    );
  console.log(result);
  return result.recordset;
};

exports.getAllUserService = async () => {
  const result = await new sql.Request().query("select * from users");
  return result.recordset;
};

exports.checkEmail = async (email) => {
  const result = await new sql.Request()
    .input("email", sql.NVarChar, email)
    .query("select * from users where email=@email");
  return result.recordset;
};

exports.login = async (username) => {
  const request = await new sql.Request();
  const result = await request
    .input("username", sql.NVarChar, username)
    .query("select * from users where username=@username");
  return result.recordset[0];
};
