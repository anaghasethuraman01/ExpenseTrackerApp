import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import UserTable from "./DetailsTable/UserTable";
import UserExpenseTable from "./DetailsTable/UserExpenseTable";
import CreateUser from "./Create/CreateUser";
import Navbar from "./Navbar/Navbar";
import AddExpense from "./Create/AddExpense";
//Create a Main Component
class Main extends Component {
	render() {
		return (
			<div>
				{/*Render Different Component based on Route*/}
				<Route path="/" component={Navbar} />
				<Route path="/login" component={Login} />
				<Route path="/usertable" component={UserTable} />
				<Route path="/createuser" component={CreateUser} />
				<Route path="/expensetable" component={UserExpenseTable} />
				<Route path="/createexpense" component={AddExpense} />
			</div>
		);
	}
}
//Export The Main Component
export default Main;
