const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const { connectDB } = require("./db.js");
const cors = require("cors");
const userRoute = require("./route.js");
const middleware = require("./middleware.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDB();

app.use("/user", userRoute.router);

app.use(middleware.errorHandling);

app.listen(3000, () => {
  console.log("Server run at 3000");
});
