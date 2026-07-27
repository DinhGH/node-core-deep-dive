const { getuserservice, getuserservice1 } = require("./service.js");
exports.getuser = async (req, res) => {
  const data = await getuserservice(req, res);
  res.setHeader("Content-Type", "text/plain"); // Ghi đè Content-Type của response hiện tại thành text/plain. Chỉ được làm trước khi header được gửi.
  res.writeHead(200);
  res.write("test1");
  res.write("test2"); // write() chỉ nhận String, Buffer hoặc Uint8Array.
  // Không nhận trực tiếp Object.
  // Có thể truyền JSON.stringify(obj) vì kết quả trả về là String.
  // trong api it dung .write: dung khi stream du lieu ve, gui ve tung chunk nho. no gui du lieu ve nhung ko ket thuc request, con .end gui du lieu ve va ket thuc
  res.end(
    JSON.stringify({ status: "success", result: data.length, data: data }),
  );
};

exports.getuser1 = async (req, res, id) => {
  const data = await getuserservice1(id);
  console.log(data);
  console.log(typeof data);
  res.writeHead(200);
  res.end(
    JSON.stringify({ status: "success", result: data.length, data: data }),
  );
};

//neu ko dung exports.func o moi ham, thi co the dung module.exports = {getuser, getuser1}
