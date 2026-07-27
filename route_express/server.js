const express = require("express"); //console.log(typeof express);//function
const postRoute = require("./route.js");
const app = express(); //=const server = http.createServer(...)
// app.get()route get
// app.post()route post
// app.use()dung midldeware
// app.listen()//lang nghe client goi
app.use(express.json()); //dung midleware doc json chuyen doi tu
app.use("/api/testdata/post", postRoute.router);
//Khi URL bắt đầu bằng path này thì chuyển request sang router.
app.listen(3000, () => {
  console.log("Server run at 3000");
});
