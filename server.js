var http = require("http");
var app = require("express")();
var path = require("path");
var bodyparser = require("body-parser");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var maria = require("mariadb");

server.listen(8080);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var connection = maria.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_leenknea",
  password: "Floppypenguin7",
  database: "cs340_leenknea"
});

connection.connect(function(error) {
  if (!!error) {
    console.log("Error");
  } else {
    console.log("Connected");
  }
});

io.on("connection", socket => {
  //
});

app.post("/api/auth/account", function(req, res) {
  res.status(200).send("TEST ID");
});

app.post("/api/message", function(req, res) {
  //
});

app.get("/api/auth/account", function(req, res) {
  //
});

app.get("/api/setup", function(req, res) {
  //GET PICTURES
  //GET ROOMS
});

app.get("/api/rooms", function(req, res) {
  res.status(200).send("TEST ROOMS");
});

app.get("/index.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/js/index.js"));
});

app.get("/img/:image_name", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/img/" + req.params.image_name));
});

app.get("/style.css", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/css/style.css"));
});

app.get("/animate.css", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/css/animate.css"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

//
