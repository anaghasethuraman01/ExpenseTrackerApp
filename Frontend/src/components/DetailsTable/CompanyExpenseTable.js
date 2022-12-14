import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class CompanyExpenseTable extends Component {
	constructor() {
		super();
		this.state = {
			companyExpenses: [],
		};
	}

	componentDidMount() {
		axios.get("http://localhost:3001/companydetails").then((response) => {
			console.log(response);
			//update the state with the response data
			this.setState({
				companyExpenses: this.state.companyExpenses.concat(response.data),
			});
		});
	}

	render() {
		let details = this.state.companyExpenses.map((expense) => {
			return (
				<tr>
					{/* <td>{expense.expid}</td> */}

					<td>{expense.category}</td>
					<td>{expense.totalexpense}</td>
				</tr>
			);
		});
		let redirectVar = null;
		if (localStorage.getItem("Login") == "Yes") {
			redirectVar = <Redirect to="/companytable" />;
		} else {
			redirectVar = <Redirect to="/login" />;
		}
		return (
			<div>
				{redirectVar}
				<div className="container">
					<h2>Company Expense Details</h2>

					<table className="table">
						<thead>
							<tr>
								{/* <th>Id</th> */}
								<th>Category</th>
								<th>Total Expense($)</th>
							</tr>
						</thead>
						<tbody>{details}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default CompanyExpenseTable;
