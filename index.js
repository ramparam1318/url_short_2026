const express = require("express");
const app = express();
const port = require("./config/env").PORT;
const { home, url, analytics } = require("./routers/index");
const db_connect = require("./config/db");

db_connect.connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", home);
app.use("/url", url);
// app.use("/analytics", analytics);

app.listen(port, () => {
  console.log(`URL Shortener app listening ksdsfj at http://localhost:${port}`);
});