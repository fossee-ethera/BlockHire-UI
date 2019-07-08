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
  password: "password",
  database: "GethHired"
});

connection.connect(function(err) {
  err ? console.log(err) : console.log(connection);
});

//akshat functions
app.get("/Company/Jobs/:abc", function(req, res) {
  connection.query(
    "select * from Job_Post where company_id =?",
    [req.params.abc],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/CompanyJobs/CandidatesForJob", function(req, res) {
  connection.query(
    "select jb.candidate_id, jb.status, jb.job_id, us.first_name, us.last_name from JobRequest as jb inner join Users as us on jb.candidate_id = us.user_id",
    //"select * from JobCandidate",
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

//require("./routes/html-routes")(app, connection);
app.get("/Category/:wallet_address", function(req, res) {
  connection.query(
    "select category from Category where wallet_address=?",
    [req.params.wallet_address],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/ExperienceStatus/:swarm_id", function(req, res) {
  connection.query(
    "select status from Experience where swarm_id=?",
    [req.params.swarm_id],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/EducationStatus/:swarm_id", function(req, res) {
  connection.query(
    "select status from Education where swarm_id=?",
    [req.params.swarm_id],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

//Fetching data from Views
app.get("/ExperienceUserView/:vr_id", function(req, res) {
  connection.query(
    "select first_name,last_name from ExperienceUserView where vr_id=?",
    [req.params.vr_id],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/EducationUserView/:vr_id", function(req, res) {
  connection.query(
    "select first_name,last_name from EducationUserView where vr_id=?",
    [req.params.vr_id],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/About/:wallet_addr", function(req, res) {
  connection.query(
    "select * from Users where user_id=?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/Experience/:wallet_addr", function(req, res) {
  connection.query(
    "select * from Experience where user_id=?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/CompanyID/:name", function(req, res) {
  connection.query(
    "select company_id from Company where name=?",
    [req.params.name],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/Company/:wallet_addr", function(req, res) {
  connection.query(
    "select name, email_id, description, website, industry, hq   from Company where company_id =?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.put("/EditAboutUser/:user_id", function(req, res) {
  connection.query(
    "UPDATE Users SET first_name=?,last_name=?,about=? ,skills=?  WHERE user_id =?",
    [
      req.body.first_name,
      req.body.last_name,
      req.body.about,
      req.body.skills,
      req.params.user_id
    ],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});

app.put("/EditCompany/:company_id", function(req, res) {
  connection.query(
    "UPDATE Company SET name=? ,email_id=? ,description=? ,website=? ,industry=? ,hq=?  WHERE company_id =?",
    [
      req.body.name,
      req.body.email_id,
      req.body.description,
      req.body.website,
      req.body.industry,
      req.body.hq,
      req.params.company_id
    ],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});
// app.get("/validation", function(req, res) {
//   connection.query("SELECT * FROM validateRequests", function(err, results) {
//     err ? res.send(err) : res.json({ data: results });
//   });
// }).then(
//   function(req,res){
//     connection.query("SELECT * FROM validateRequests", function(err, results) {
//       err ? res.send(err) : res.json({ data: results });
//   });

app.get("/ValidationRequests", function(req, res) {
  connection.query("SELECT * FROM Validation_Requests", function(err, results) {
    err ? res.send(err) : res.json({ data: results });
  });
});

app.get("/SwarmID/:vr_id", function(req, res) {
  connection.query(
    "SELECT swarm_id FROM Validation_Requests WHERE `vr_id` =?",
    [req.params.vr_id],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/getCategory/:vr_id", function(req, res) {
  connection.query(
    "SELECT category FROM Validation_Requests WHERE `vr_id` =?",
    [req.params.vr_id],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

//update status of certificate in Experience to pending
app.put("/changeExperienceState/:swarm_id", function(req, res) {
  connection.query(
    "UPDATE Experience SET status=?  WHERE swarm_id =?",
    [req.body.status, req.params.swarm_id],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});

//update certificate status Done after validating
app.post("/AcceptDoc/:swarm_id", function(req, res) {
  connection.query(
    "update Experience set status='Done',txn_hash=? where swarm_id =?",
    [req.body.txn_hash,req.params.swarm_id],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});

//update certificate status Rejected after validating
app.post("/RejectDoc/:swarm_id", function(req, res) {
  connection.query(
    "UPDATE ?? SET status='Rejected'  WHERE swarm_id =?",
    [req.body.category, req.params.swarm_id],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});

app.delete("/DeleteExperience", function(req, res) {
  connection.query(
    "DELETE FROM `Experience` WHERE `swarm_id`=?",
    [req.body.swarm_id],
    function(error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
});

app.post("/Validation", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Validation_Requests SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/UserTable", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Users SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/CompanyTable", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Company SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get("/Company/:wallet_addr", function(req, res) {
  connection.query(
    "select name, email_id, description, website, industry, hq   from Company where company_id =?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.post("/AddExperience", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Experience SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/Category", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Category SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

//for posting job
app.post('/JobPost', function (req, res) {
  var postData  = req.body;
  connection.query('INSERT INTO Job_Post SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


app.get("/jobscandidate", function(req, res) {
  connection.query(
    "select Job_Post.id, Job_Post.description, Job_Post.type, Job_Post.designation, Job_Post.salary, Job_Post.industry, Job_Post.duration, Job_Post.skills, Company.name, JobRequest.status from Job_Post INNER JOIN Company on Job_Post.company_id = Company.company_id LEFT OUTER JOIN JobRequest on Job_Post.id = JobRequest.Job_id",
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});


app.post('/applyjob', function(req, res) {
  var postData = req.body;
  connection.query('INSERT INTO JobRequest SET ?',postData, function (error, results, fields) {
      if(error) throw error;
      res.end(JSON.stringify(results));
  });
});

//for viewing shortlisted candidates in company/jobs
app.put("/ChangeJobStatus/:abc", function(req, res) {
  connection.query(
    "UPDATE JobRequest SET status=?  WHERE candidate_id =? and job_id=?",
    [req.body.status, req.params.abc, req.body.job_id],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});