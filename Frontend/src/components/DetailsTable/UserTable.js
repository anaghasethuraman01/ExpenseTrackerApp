import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import EditUser from "../EditTables/EditUser";

class UserTable extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}
	//get the books data from backend
	componentDidMount() {
		axios.get("http://localhost:3001/usertabledetails").then((response) => {
			//update the state with the response data
			this.setState({
				users: this.state.users.concat(response.data),
			});
		});
	}
	deleteUser = (e, userId) => {
		e.preventDefault();
		const data = {
			userId: userId,
		};
		axios.defaults.withCredentials = true;
		axios.post("http://localhost:3001/deleteuser", data).then((response) => {
			console.log(response.data);
			this.setState({
				users: response.data,
			});
		});
	};
	createUser = () => {
		const { history } = this.props;
		history.push("/createuser");
	};
	editUser = (user) => {
		console.log(user.firstName);
		localStorage.setItem("userDet", JSON.stringify(user));
		const { history } = this.props;
		history.push("/edituser");
	};
	render() {
		//iterate over books to create a table row
		let details = this.state.users.map((user) => {
			return (
				<tr>
					{/* <td>{user.userId}</td> */}
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.totalExpense}</td>
					<td>
						<button
							onClick={(e) => {
								this.editUser(user);
							}}
						>
							Edit
						</button>
					</td>
					<td>
						<button
							onClick={(e) => {
								this.deleteUser(e, user.userId);
							}}
						>
							Delete
						</button>
					</td>
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
				{redirectVar}
				<div className="container">
					<h2>User Details Table</h2>
					<button onClick={this.createUser}>Add new User</button>
					<table className="table">
						<thead>
							<tr>
								{/* <th>User Id</th> */}
								<th>First Name</th>
								<th>Last Name</th>
								<th>Total Expenses</th>
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

export default UserTable;
