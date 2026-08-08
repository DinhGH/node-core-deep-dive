const sql = require("mssql");

const config = {
  user: "sa",
  password: "dinh2kk5",
  server: "localhost",
  database: "test_authentication",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Server!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectDB, sql };
