const http = require("http");
const testdata = require("./route.js"); // co .js hay ko deu duoc. nhung dung import thi phai co .js neu ko thi ERR_MODULE_NOT_FOUND
const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json"); //chi set loai du lieu, chu chua gui ve client, no duoc truyen toi cac ham con thong qua res
  try {
    console.log(req.method, req.url); // xem thu cac req nao duoc gui len
    if (req.url.startsWith("/api/testdata")) {
      return await testdata(req, res);
    } else {
      console.log("loi o day");
      res.writeHead(404); // Thiết lập status code.
      // Nếu chưa gửi header thì Node sẽ chuẩn bị gửi header.
      // Header thực sự được gửi khi bắt đầu ghi body hoặc kết thúc response.
      //res.writeHead(404, { "Content-Type": "application/json" });//co the dung cai nay de thay cho res.statusCode() + res.setHeader(), nhung hien tai da co res.setHeader() dung chung roi nen ko can
      res.end(JSON.stringify({ status: "error", message: "Not Found!" })); // chuyen obj sang string(JSON): '{"status":"error","message":"Not Found!"}'
    }
  } catch (error) {
    res.writeHead(500); // writeHead() sẽ gửi status code cùng các header đã được set trước đó.
    res.end(JSON.stringify({ status: "error", message: error.message }));
  }
});

// server.listen(5000); //port: 0 - 65535
server.listen(5000, () => {
  console.log("Server running"); // them callback
});
// server.listen(
//   {
//     port: 5000,
//     host: "0.0.0.0", //dia chi ip
//     backlog: 511, // số kết nối chờ tối đa
//     exclusive: false, // chia sẻ server giữa các process
//   },
//   () => {
//     console.log("Running");
//   },
// );

// server.listen(5000, "127.0.0.1"); // chi may local cua minh chay duoc
// server.listen(5000, "0.0.0.0"); // tat ca may cung mang lan la chay dc

//req.url chi co tham so nay de lay url. con req.params va req.body k co, phai tu viet ta de lay du lieu
