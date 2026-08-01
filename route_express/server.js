const express = require("express"); //console.log(typeof express);//function
const userRoute = require("./route.js");
const { connectDB } = require("./db.js");
const app = express(); //=const server = http.createServer(...)
// app.get()route get
// app.post()route post
// app.use()dung midldeware
// app.listen()//lang nghe client goi
app.use(express.json()); //dung midleware doc json chuyen doi tu json sang object

connectDB();

app.use("/api/users", userRoute.router);
//Khi URL bắt đầu bằng path này thì chuyển request sang router.
app.listen(3000, () => {
  console.log("Server run at 3000");
});

// req.params la lay tham so dong minh khai bao o url.router.get('/users/:id', getUserDetail).
// /users/2 -> req.params.id = '2'
// req.query la lay cac bien tham so o url. /users?id=1&limit=10. no tra ve obj: {id: '1', limit: '10'}
// req.body Dùng để truyền dữ liệu lớn, nhạy cảm hoặc cấu trúc phức tạp (như tạo mới/cập nhật) mà không muốn lộ trên URL.
