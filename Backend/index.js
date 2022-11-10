//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
	session({
		secret: "leandata",
		resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
		saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
	})
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	res.setHeader("Cache-Control", "no-cache");
	next();
});

// to store data from user table, expense table, company table
var users = [];
var userExpenses = [];
var companyExpenses = [];

app.post("/login", (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	if (username == "admin" && password == "admin") {
		res.end("Success");
	} else {
		res.end("Failed");
	}
});
//Table 1 : User Table Operations
app.post("/createuser", (req, res) => {
	req.body["totalExpense"] = 0;
	let users_id = users.filter((x) => x.userId == req.body.userId);
	if (users_id.length == 0) {
		users.push(req.body);
		res.end("Success");
	} else {
		res.end("This User ID already exist!!");
	}
});

app.get("/usertabledetails", function (req, res) {
	res.end(JSON.stringify(users));
});

app.post("/deleteuser", function (req, res) {
	const deleteId = req.body;
	console.log(deleteId);
	users = users.filter((x) => x.userId != deleteId.userId);
	userExpenses = userExpenses.filter((x) => x.userId != deleteId.userId);
	//console.log(users)
	res.end(JSON.stringify(users));
});

//Table 2 : Expense Table Operations

app.post("/createexpense", (req, res) => {
	req.body["expid"] = Math.floor(Math.random() * 100);
	userExpenses.push(req.body);
	console.log(req.body.userId);
	var user = users.filter((x) => x.userId == req.body.userId);
	user[0].totalExpense = Number(user[0].totalExpense) + Number(req.body.cost);
	res.end("Success");
});

app.get("/expensetabledetails", function (req, res) {
	res.end(JSON.stringify(userExpenses));
});
app.post("/deleteexpense", function (req, res) {
	//const deleteId = req.body.expId;
	console.log(req.body);
	userExpenses = userExpenses.filter((x) => x.expid != req.body.expId);
	var user = userExpenses.filter((x) => x.userId == req.body.userId);
	user[0].totalExpense = Number(user[0].totalExpense) - Number(req.body.cost);
	res.end(JSON.stringify(userExpenses));
});

app.listen(3001);
//console.log("Server Listening on port 3001");
