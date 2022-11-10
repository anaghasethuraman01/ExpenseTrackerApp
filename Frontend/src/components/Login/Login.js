import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
class Login extends Component {
	//call the constructor method
	constructor(props) {
		//Call the constrictor of Super class i.e The Component
		super(props);
		//maintain the state required for this component
		this.state = {
			username: "",
			password: "",
			message: null,
		};
		//Bind the handlers to this class
		this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
	}

	//username change handler to update state variable with the text entered by the user
	usernameChangeHandler = (e) => {
		this.setState({
			username: e.target.value,
		});
	};
	//password change handler to update state variable with the text entered by the user
	passwordChangeHandler = (e) => {
		this.setState({
			password: e.target.value,
		});
	};
	//admin Login
	submitLogin = (e) => {
		e.preventDefault();
		const data = {
			username: this.state.username,
			password: this.state.password,
		};
		//set the with credentials to true
		axios.defaults.withCredentials = true;
		//make a post request with the user data
		axios
			.post("http://localhost:3001/login", data)
			.then((response) => {
				if (response.data == "Success") {
					const { history } = this.props;
					history.push("/usertable");
				} else {
					this.setState({
						message: "Invalid Credentials!",
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		//redirect based on successful login
		console.log("render called");
		let redirectVar = null;
		let errorMsg = "";
		// if (cookie.load("cookie")) {
		// 	redirectVar = <Redirect to="/home" />;
		// }
		return (
			<div>
				{/* {redirectVar} */}
				<div className="container">
					<div className="login-form">
						<div className="main-div">
							<div className="panel">
								<h2>Expense Tracker Admin Login</h2>
								<p>Please enter your username and password</p>
							</div>

							<div className="form-group">
								<input
									onChange={this.usernameChangeHandler}
									type="text"
									className="form-control"
									name="username"
									placeholder="Username"
								/>
							</div>
							<div className="form-group">
								<input
									onChange={this.passwordChangeHandler}
									type="password"
									className="form-control"
									name="password"
									placeholder="Password"
								/>
							</div>
							<div className="form-group">
								<button onClick={this.submitLogin} className="btn btn-primary">
									Login
								</button>
							</div>

							<div className="form-group">
								<div style={{ color: "#ff0000" }}>
									<h4>{this.state.message}</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
