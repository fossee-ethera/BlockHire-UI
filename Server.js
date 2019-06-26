const express = require("express");

const mysql = require("mysql");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
