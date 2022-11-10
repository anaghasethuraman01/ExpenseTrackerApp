import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}
	//handle logout to destroy the cookie
	handleLogout = () => {
		localStorage.clear();
	};
	render() {
		//if Cookie is set render Logout Button
		let navLogin = null;
		if (localStorage.getItem("Login") == "Yes") {
			console.log("Able to read cookie");
			navLogin = (
				<ul className="nav navbar-nav navbar-right">
					<li>
						<Link to="/" onClick={this.handleLogout}>
							<span className="glyphicon glyphicon-user"></span>Logout
						</Link>
					</li>
				</ul>
			);
		} else {
			//Else display login button
			console.log("Not Able to read cookie");
			navLogin = (
				<ul className="nav navbar-nav navbar-right">
					<li>
						<Link to="/login">
							<span className="glyphicon glyphicon-log-in"></span> Login
						</Link>
					</li>
				</ul>
			);
		}
		let redirectVar = null;
		if (localStorage.getItem("Login") == "Yes") {
			redirectVar = <Redirect to="/usertable" />;
		} else {
			redirectVar = <Redirect to="/login" />;
		}
		return (
			<div>
				{redirectVar}
				<nav className="navbar navbar-inverse">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand">Expense Tracker App</a>
						</div>
						<ul className="nav navbar-nav">
							<li>
								<Link to="/usertable">User Details</Link>
							</li>
							<li>
								<Link to="/expensetable">Expense Details</Link>
							</li>
							<li>
								<Link to="/companytable">Company Expense Detials</Link>
							</li>
						</ul>
						{navLogin}
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
