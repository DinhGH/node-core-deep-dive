const express = require("express"); //console.log(typeof express);//function
const userRoute = require("./route.js");
const { connectDB } = require("./db.js");
const middleware = require("./middleware.js");
const app = express(); //=const server = http.createServer(...)
// app.get()route get
// app.post()route post
// app.use()dung midldeware
// app.listen()//lang nghe client goi
app.use(express.json()); //Đọc dữ liệu JSON được gửi từ client và chuyển nó thành object JavaScript để lưu vào req.body.
//chuyen req.body tat ca sang object tu json ma client gui o body.
//neu ko co middleware nay thi mac dinh req.body la undefined. dua vao Content-Type: application/json de nhan dien
let countRequest = 1;
// app.use(
//   // middleware.errorHandling,//neu khai bao o day thi no ko hoat, he thong tra loi theo kieu cua no
//   // middleware.checkuserid, // middleware sinh loi de dung cac middleware khac
//   middleware.logRequest,
//   middleware.timeRequest,
//   (req, res, next) => {
//     console.log(countRequest++);
//     next();
//   },
// );
//
connectDB();

app.use("/api/users", userRoute.router); // pham vi o application moi request de phai di qua
//Khi URL bắt đầu bằng path này thì chuyển request sang router.

app.use(middleware.errorHandling); //middleware xu ly loi phai khai bao sau cung cac route de dam bao
app.listen(3000, () => {
  console.log("Server run at 3000");
});

// req.params la lay tham so dong minh khai bao o url.router.get('/users/:id', getUserDetail).
// /users/2 -> req.params.id = '2'
// req.query la lay cac bien tham so o url. /users?id=1&limit=10. no tra ve obj: {id: '1', limit: '10'}
// req.body Dùng để truyền dữ liệu lớn, nhạy cảm hoặc cấu trúc phức tạp (như tạo mới/cập nhật) mà không muốn lộ trên URL.
