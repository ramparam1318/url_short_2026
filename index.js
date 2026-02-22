const express = require("express");
const app = express();
const port = require("./config/env").PORT;
const { home, url, analytics, user } = require("./routers/index");
const db_connect = require("./config/db");
const cookieParser = require("cookie-parser");

db_connect.connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", home);
app.use("/url", url);
app.use("/user", user);
// app.use("/analytics", analytics);

app.listen(port, () => {
  console.log(`URL Shortener app listening ksdsfj at http://localhost:${port}`);
});