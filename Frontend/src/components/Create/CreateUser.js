import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

import { Redirect } from "react-router";

class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			firstName: "",
			lastName: "",
			isCreated: false,
			isErrMsgNeeded: false,
			validationErr: {},
			message: null,
		};

		//bind the handlers to this class
		this.userIdChangeHandler = this.userIdChangeHandler.bind(this);
		this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
		this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
		this.Create = this.Create.bind(this);
	}
	componentWillMount() {
		console.log("compWillMount");
		this.setState({
			isCreated: false,
		});
	}

	userIdChangeHandler = (e) => {
		this.setState({
			userId: e.target.value,
		});
	};

	firstNameChangeHandler = (e) => {
		this.setState({
			firstName: e.target.value,
		});
	};

	lastNameChangeHandler = (e) => {
		this.setState({
			lastName: e.target.value,
		});
	};

	Create = (e) => {
		let errors = {};
		e.preventDefault();
		const data = {
			userId: this.state.userId,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};
		axios.defaults.withCredentials = true;
		axios.post("http://localhost:3001/createuser", data).then((response) => {
			if (response.data == "Success") {
				const { history } = this.props;
				history.push("/usertable");
			} else {
				this.setState({
					message: response.data,
				});
			}
		});
	};

	render() {
		let redirectVar = null;
		// if (!cookie.load("cookie")) {
		// 	redirectVar = <Redirect to="/home" />;
		// }
		// if (cookie.load("cookie") && this.state.isCreated === true) {
		// 	redirectVar = <Redirect to="/home" />;
		// }

		return (
			<div>
				{/* {redirectVar} */}
				<br />
				<div className="container">
					<form action="http://127.0.0.1:3000/createuser" method="post">
						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.userIdChangeHandler}
								type="text"
								className="form-control"
								name="userId"
								placeholder="User Id"
							/>
						</div>
						<br />

						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.firstNameChangeHandler}
								type="text"
								className="form-control"
								name="firstName"
								placeholder="First Name"
							/>
						</div>
						<br />
						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.lastNameChangeHandler}
								type="text"
								className="form-control"
								name="lastName"
								placeholder="Last Name"
							/>
						</div>

						<br />
						<div style={{ width: "30%" }}>
							<button
								className="btn btn-success"
								type="submit"
								onClick={this.Create}
							>
								Add new user
							</button>
						</div>
						<div style={{ color: "#ff0000" }}>
							<h4>{this.state.message}</h4>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default CreateUser;
