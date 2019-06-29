const express = require("express");

const mysql = require("mysql");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
var bodyParser = require("body-parser");
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "blockdb"
});

connection.connect(function(err) {
  err ? console.log(err) : console.log(connection);
});

//require("./routes/html-routes")(app, connection);
app.get("/", function(req, res) {
  connection.query("SELECT * FROM about", function(err, results) {
    err ? res.send(err) : res.json({ data: results });
  });
});

app.get("/validation", function(req, res) {
  connection.query("SELECT * FROM validateRequests", function(err, results) {
    err ? res.send(err) : res.json({ data: results });
  });
});

//update status of certificate
app.put("/validation", function(req, res) {
  connection.query(
    "UPDATE `validateRequests` SET `status`=?  WHERE `certiname` =?",
    [req.body.stat, req.body.cert],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
