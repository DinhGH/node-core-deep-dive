const express = require("express");
const { connectDB } = require("./db.js");
const userRoute = require("./route.js");
const middleware = require("./middleware.js");

const app = express();
app.use(express.json());
connectDB();

app.use("/user", userRoute.router);

app.use(middleware.errorHandling);

app.listen(3000, () => {
  console.log("Server run at 3000");
});
