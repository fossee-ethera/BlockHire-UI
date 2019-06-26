const mysql = require("mysql");

module.exports = function(app, connection) {
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM about", function(err, results) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    });
  });
};
