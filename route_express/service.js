const { sql } = require("./db");

exports.getAllUsers = async () => {
  const result = await sql.query(
    "select * from users", //; select * from UserDetails
  );
  return result.recordset; // tra ve ket qua cua select dau tien.
  // return result.recordsets; //tra ve mang 2D chua ket qua cua nhieu cau select.
  // return result;
};

exports.getUserPagination = async (page = 1, limit = 3) => {
  const pageNumber = Math.max(1, parseInt(page, 10)); // 10 la chuyen INT trong the thap phan
  const limitNumber = Math.max(1, parseInt(limit, 10)); // max de tranh truyen vao so am
  const offset = (page - 1) * limit;
  const request = new sql.Request();
  const usersData = await request
    .input("offset", sql.Int, offset)
    .input("limit", sql.Int, limit)
    .query(
      `
    SELECT id, username, email, created_at 
    FROM users 
    ORDER BY id ASC 
    OFFSET @offset ROWS 
    FETCH NEXT @limit ROWS ONLY;
  `,
    );
  console.log(usersData);
  const countuser = await request.query("select count(*) as total from users");
  console.log(countuser);
  const totalUser = countuser.recordset[0].total;
  const totalpage = Math.ceil(totalUser / limitNumber);
  return {
    users: usersData,
    pagination: {
      currentPage: pageNumber,
      limit: limitNumber,
      totalUser: totalUser,
      totalpage: totalpage,
    },
  };
};

exports.checkEmail = async (email) => {
  const request = new sql.Request();
  const result = await request
    .input("email", sql.NVarChar, email)
    .query("select * from users where email=@email");
  return result.recordset[0];
};

exports.createUser = async (user) => {
  const request = new sql.Request();
  const result = await request
    .input("username", sql.NVarChar, user.username)
    .input("email", sql.NVarChar, user.email)
    .input("password", sql.NVarChar, user.password)
    .query(
      "insert into users(username,email,password) values(@username,@email,@password)",
    );
  return result.recordset;
};

exports.getUserById = async (id) => {
  // const result = await sql.query(`select * from users where id = ${id}`);
  // nguy co tan cong sql injection. neu id nguoi ta truyen len: 1 or 1=1;DROP TABLE Users; --
  const request = new sql.Request();
  const result = await request
    .input("id", sql.Int, id)
    .query("select * from users where id = @id"); //Parameterized Queries
  // Database nhận câu lệnh SELECT * FROM Users WHERE id = @id và biên dịch sẵn khung xử lý.
  //  Database hiểu chắc chắn rằng @id chỉ là một giá trị dữ liệu (Data), không thể chứa bất kỳ câu lệnh thực thi nào (Code).
  // ban chat orm
  return result.recordset;
};

exports.updateUser = async (user, id) => {
  const { username, email, password } = user;
  const request = new sql.Request();
  const result = await request
    .input("id", sql.Int, id)
    .input("username", sql.NVarChar, username)
    .input("email", sql.NVarChar, email)
    .input("password", sql.NVarChar, password)
    .query(
      "update users set username = @username, email = @email, password = @password where id = @id",
    );
  return result.rowsAffected[0];
  //return result;//{recordsets: [],recordset: undefined,output: {},rowsAffected: [ 1 ]}
};

exports.updateUser1 = async (user, id) => {
  let update = [];
  const request = new sql.Request();
  request.input("id", sql.Int, id);
  if (user.username !== undefined) {
    request.input("username", sql.NVarChar, user.username);
    update.push("username=@username");
  }
  if (user.email !== undefined) {
    request.input("email", sql.NVarChar, user.email);
    update.push("email=@email");
  }
  if (user.password !== undefined) {
    request.input("password", sql.NVarChar, user.password);
    update.push("password=@password");
  }

  const result = await request.query(
    `update users set ${update.join(",")} where id=@id`,
  );
  return result.rowsAffected[0];
};

exports.deleteUser = async (id) => {
  const request = new sql.Request();
  const result = await request
    .input("id", sql.Int, id)
    .query("delete from users where id=@id");
  return result.rowsAffected[0];
};
