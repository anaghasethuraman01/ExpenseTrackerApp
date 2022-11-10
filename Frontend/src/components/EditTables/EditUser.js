import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

import { Redirect } from "react-router";

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: JSON.parse(localStorage.getItem("userDet"))["userId"],
			firstName: JSON.parse(localStorage.getItem("userDet"))["firstName"],
			lastName: JSON.parse(localStorage.getItem("userDet"))["lastName"],
			isCreated: false,
			isErrMsgNeeded: false,
			validationErr: {},
			message: null,
		};

		//bind the handlers to this class

		this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
		this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
		this.validateUserUpdate = this.validateUserUpdate.bind(this);
	}
	componentWillMount() {
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

	saveDetails = (e) => {
		let errors = {};
		e.preventDefault();
		if (this.validateUserUpdate() == true) {
			const data = {
				userId: this.state.userId,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
			};
			axios.defaults.withCredentials = true;
			axios.post("http://localhost:3001/updateuser", data).then((response) => {
				if (response.data == "Success") {
					const { history } = this.props;
					history.push("/usertable");
				}
			});
		}
	};
	validateUserUpdate = () => {
		let validationErr = {};
		let isValid = true;
		if (this.state.firstName === "" || this.state.firstName === " ") {
			validationErr["firstName"] = "First Name cannot be Empty!  ";
			isValid = false;
		}
		if (this.state.lastName === "" || this.state.lastName === " ") {
			validationErr["lastName"] = "Last Name cannot be Empty!  ";
			isValid = false;
		}

		this.setState({
			validationErr: validationErr,
		});

		return isValid;
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
					<form action="http://127.0.0.1:3000/edituser" method="post">
						<div className="errorMsg">{this.state.validationErr.firstName}</div>
						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.firstNameChangeHandler}
								type="text"
								className="form-control"
								value={this.state.firstName}
								placeholder="First Name"
							/>
						</div>
						<br />
						<div className="errorMsg">{this.state.validationErr.lastName}</div>
						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.lastNameChangeHandler}
								type="text"
								className="form-control"
								name="lastName"
								value={this.state.lastName}
								placeholder="Last Name"
							/>
						</div>

						<br />
						<div style={{ width: "30%" }}>
							<button
								className="btn btn-success"
								type="submit"
								onClick={this.saveDetails}
							>
								Save
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

export default EditUser;
