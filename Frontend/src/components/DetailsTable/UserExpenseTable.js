import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class UserExpenseTable extends Component {
	constructor() {
		super();
		this.state = {
			userExpenses: [],
		};
	}

	componentDidMount() {
		axios.get("http://localhost:3001/expensetabledetails").then((response) => {
			//update the state with the response data
			console.log(response);
			this.setState({
				userExpenses: this.state.userExpenses.concat(response.data),
			});
		});
	}
	deleteExpense = (expid, userId) => {
		//e.preventDefault();
		const data = {
			expId: expid,
			userId: userId,
		};
		console.log(data);
		axios.defaults.withCredentials = true;
		axios.post("http://localhost:3001/deleteexpense", data).then((response) => {
			console.log(response.data);
			this.setState({
				userExpenses: response.data,
			});
		});
	};
	createExpense = () => {
		const { history } = this.props;
		history.push("/createexpense");
	};
	editExpense = (expense) => {
		localStorage.setItem("expenseDet", JSON.stringify(expense));
		const { history } = this.props;
		history.push("/editexpense");
	};
	render() {
		let redirectVar = null;
		if (localStorage.getItem("Login") == "Yes") {
			redirectVar = <Redirect to="/expensetable" />;
		} else {
			redirectVar = <Redirect to="/login" />;
		}
		let details = this.state.userExpenses.map((expense) => {
			return (
				<tr>
					{/* <td>{expense.expid}</td> */}
					<td>{expense.userName}</td>
					<td>{expense.category}</td>
					<td>{expense.description}</td>
					<td>{expense.cost}</td>
					<td>
						<button
							onClick={(e) => {
								this.editExpense(expense);
							}}
						>
							Edit
						</button>
					</td>
					<td>
						<button
							onClick={(e) => {
								this.deleteExpense(expense.expid, expense.userId);
							}}
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});

		return (
			<div>
				{redirectVar}
				<div className="container">
					<h2>User Expense Details</h2>
					<button onClick={this.createExpense}>Add New Expense</button>
					<table className="table">
						<thead>
							<tr>
								{/* <th>Id</th> */}
								<th>User Name</th>
								<th>Category</th>
								<th>Description</th>
								<th>Cost($)</th>
							</tr>
						</thead>
						<tbody>
							{/*Display the Tbale row based on data recieved*/}
							{details}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default UserExpenseTable;
