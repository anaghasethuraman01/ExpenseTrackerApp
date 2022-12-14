//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const e = require("express");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
	session({
		secret: "leandata",
		resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
		saveUninitialized: false,

		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 30,
		},
		// Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
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
	req.body["userId"] = Math.floor(Math.random() * 100);
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
app.post("/updateuser", function (req, res) {
	const userId = req.body.userId;
	let sel_users = users.filter((x) => x.userId == userId);
	sel_users[0].firstName = req.body.firstName;
	sel_users[0].lastName = req.body.lastName;
	let exptable = userExpenses.filter((x) => x.userId == userId);
	console.log(exptable);
	exptable.map((item) => {
		item.userName = req.body.firstName + " " + req.body.lastName;
	});

	res.end("Success");
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
	//console.log(req.body);
	var deletedCost = userExpenses.filter((x) => x.expid == req.body.expId);
	cost = deletedCost[0].cost;
	userExpenses = userExpenses.filter((x) => x.expid != req.body.expId);
	var user = users.filter((x) => x.userId == req.body.userId);
	//console.log(user,user[0].totalExpense);
	user[0].totalExpense = Number(user[0].totalExpense) - Number(cost);
	res.end(JSON.stringify(userExpenses));
	res.end("Success");
});
app.post("/updateexpense", function (req, res) {
	const expId = req.body.expId;
	const userId = req.body.userId;
	let sel_expense = userExpenses.filter((x) => x.expid == expId);
	sel_expense[0].category = req.body.category;
	sel_expense[0].description = req.body.description;
	sel_user = users.filter((x) => x.userId == userId);
	sel_user[0].totalExpense =
		Number(sel_user[0].totalExpense) - Number(sel_expense[0].cost);
	sel_expense[0].cost = req.body.cost;

	sel_user[0].totalExpense =
		Number(sel_user[0].totalExpense) + Number(req.body.cost);
	res.end("Success");
});
//Table 3 : Company Table Operations
app.get("/companydetails", function (req, res) {
	//group based on category - cal total - add table id
	//create a set
	var categoryMap = new Map();
	userExpenses.map(({ category, cost }) => {
		if (categoryMap.has(category)) {
			categoryMap.set(
				category,
				Number(categoryMap.get(category)) + Number(cost)
			);
		} else {
			categoryMap.set(category, cost);
		}
	});

	companyExpenses = [...categoryMap].map(([category, totalexpense]) => ({
		category,
		totalexpense,
	}));
	res.end(JSON.stringify(companyExpenses));
});

app.listen(3001);
console.log("Server Listening on port 3001");
