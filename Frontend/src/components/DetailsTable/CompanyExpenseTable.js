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
	//get the books data from backend
	componentDidMount() {
		axios.get("http://localhost:3001/companydetails").then((response) => {
			console.log(response)
			//update the state with the response data
			this.setState({
				companyExpenses: this.state.companyExpenses.concat(response.data),
			});
		});
	}

	render() {
		//iterate over books to create a table row
		let details = this.state.companyExpenses.map((expense) => {
			return (
				<tr>
					{/* <td>{expense.expid}</td> */}

					<td>{expense.category}</td>
					<td>{expense.totalexpense}</td>
				</tr>
			);
		});
		//if not logged in go to login page
		let redirectVar = null;
		// if(!cookie.load('cookie')){
		//     redirectVar = <Redirect to= "/login"/>
		// }
		return (
			<div>
				{/* {redirectVar} */}
				<div className="container">
					<h2>Company Expense Details</h2>

					<table className="table">
						<thead>
							<tr>
								{/* <th>Id</th> */}
								<th>Category</th>
								<th>Total Expense</th>
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

export default CompanyExpenseTable;
