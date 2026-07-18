const express = require("express");
const sql = require("mssql");
const app = express();
const port = 3000;

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: "master",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    console.log("Đang kết nối tới Database...");
    const pool = await sql.connect(config);
    console.log("Kết nối Database thành công!");
    return pool;
  } catch (err) {
    console.log("Kết nối tới Database thất bại!");
    throw err; // Ném lỗi ra ngoài để block catch ở app.get bắt được
  }
}

app.get("/", async (req, res) => {
  try {
    // Sử dụng hàm kết nối an toàn có retry
    let pool = await connectToDatabase();

    // Tạo bảng nếu chưa tồn tại
    await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AccessLogs' AND xtype='U')
            CREATE TABLE AccessLogs (Id INT IDENTITY(1,1), AccessTime DATETIME)
        `);

    // Ghi nhận lịch sử truy cập
    await pool
      .request()
      .query("INSERT INTO AccessLogs (AccessTime) VALUES (GETDATE())");

    // Lấy ra danh sách lịch sử
    let result = await pool
      .request()
      .query("SELECT TOP 10 * FROM AccessLogs ORDER BY Id DESC");

    let html =
      "<h1>🐳 Kết nối Docker Web & SQL Server thành công!</h1><h3>Lịch sử truy cập:</h3><ul>";
    result.recordset.forEach((row) => {
      html += `<li>ID: ${row.Id} - Thời gian: ${row.AccessTime}</li>`;
    });
    html += "</ul>";

    res.send(html);
  } catch (err) {
    res
      .status(500)
      .send("Lỗi kết nối Database sau nhiều lần thử: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`Web app đang chạy ở cổng ${port}`);
});
