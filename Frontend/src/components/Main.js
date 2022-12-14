import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import UserTable from "./DetailsTable/UserTable";
import UserExpenseTable from "./DetailsTable/UserExpenseTable";
import CompanyExpenseTable from "./DetailsTable/CompanyExpenseTable";
import CreateUser from "./Create/CreateUser";
import EditUser from "./EditTables/EditUser";
import EditExpense from "./EditTables/EditExpense";
import Navbar from "./Navbar/Navbar";
import AddExpense from "./Create/AddExpense";
class Main extends Component {
	render() {
		return (
			<div>
				{/*Render Different Component based on Route*/}
				<Route path="/" component={Navbar} />
				<Route path="/login" component={Login} />
				<Route path="/usertable" component={UserTable} />
				<Route path="/createuser" component={CreateUser} />
				<Route path="/edituser" component={EditUser} />
				<Route path="/expensetable" component={UserExpenseTable} />
				<Route path="/createexpense" component={AddExpense} />
				<Route path="/editexpense" component={EditExpense} />
				<Route path="/companytable" component={CompanyExpenseTable} />
			</div>
		);
	}
}
export default Main;
