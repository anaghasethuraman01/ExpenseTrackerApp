import React, { Component } from "react";
import "../../App.css";
import axios from "axios";

import { Redirect } from "react-router";

class AddExpense extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			userName: "",
			category: "",
			description: "",
			cost: "",
			userList: [],
			isErrMsgNeeded: false,
			validationErr: {},
			message: null,
		};

		//bind the handlers to this class
		this.userNameChangeHandler = this.userNameChangeHandler.bind(this);
		this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
		this.descChangeHandler = this.descChangeHandler.bind(this);
		this.costChangeHandler = this.costChangeHandler.bind(this);
		this.Create = this.Create.bind(this);
		this.validateExpense = this.validateExpense.bind(this);
	}
	componentWillMount() {
		axios.get("http://localhost:3001/usertabledetails").then((response) => {
			let userNames = response.data.map((uname) => {
				let fullName = uname["firstName"] + " " + uname["lastName"];
				let userID = uname["userId"];
				return { key: userID, value: fullName };
			});
			this.setState({
				userList: [{ key: "", value: "(Select user name)" }].concat(userNames),
			});
		});
	}

	userNameChangeHandler = (e) => {
		var values = this.state.userList.filter(function (item) {
			return item.key == e.target.value;
		});
		this.setState({
			userId: values[0].key,
		});
		this.setState({
			userName: values[0].value,
		});
		this.setState({ validationErr: "" });
	};

	categoryChangeHandler = (e) => {
		this.setState({
			category: e.target.value,
		});
		this.setState({ validationErr: "" });
	};

	descChangeHandler = (e) => {
		this.setState({
			description: e.target.value,
		});
		this.setState({ validationErr: "" });
	};

	costChangeHandler = (e) => {
		this.setState({
			cost: e.target.value,
		});
		this.setState({ validationErr: "" });
	};

	Create = (e) => {
		let errors = {};
		e.preventDefault();
		if (this.validateExpense() == true) {
			const data = {
				userId: this.state.userId,
				userName: this.state.userName,
				category: this.state.category,
				description: this.state.description,
				cost: this.state.cost,
			};
			axios.defaults.withCredentials = true;
			axios
				.post("http://localhost:3001/createexpense", data)
				.then((response) => {
					if (response.data == "Success") {
						const { history } = this.props;
						history.push("/expensetable");
					}
				});
		}
	};

	validateExpense = () => {
		let validationErr = {};
		let isValid = true;
		if (this.state.userName === "" || this.state.userName === " ") {
			validationErr["userName"] = "Name cannot be Empty!  ";
			isValid = false;
		}
		if (this.state.category === "" || this.state.category === " ") {
			validationErr["category"] = "Category cannot be Empty!  ";
			isValid = false;
		}
		if (this.state.description === "" || this.state.description === " ") {
			validationErr["description"] = "Description cannot be Empty!  ";
			isValid = false;
		}
		if (this.state.cost === "") {
			validationErr["cost"] = "Cost cannot be Empty!";
			isValid = false;
		} else if (!this.state.cost.match(/^[0-9]+$/)) {
			validationErr["cost"] = "Cost contain alphabets";
			isValid = false;
		}

		this.setState({
			validationErr: validationErr,
		});

		return isValid;
	};

	render() {
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
						<div className="errorMsg">{this.state.validationErr.userName}</div>
						<div style={{ width: "60%", height: "30%" }} className="form-group">
							<select
								onChange={(e) => {
									this.userNameChangeHandler(e);
								}}
							>
								{this.state.userList.map((uname) => (
									<option key={uname.key} value={uname.key}>
										{uname.value}
									</option>
								))}
							</select>
						</div>

						<br />
						<div className="errorMsg">{this.state.validationErr.category}</div>
						<div style={{ width: "30%" }} className="form-group">
							<select
								className="form-control"
								name="category"
								onChange={(e) => {
									this.categoryChangeHandler(e);
								}}
							>
								<option value="">Category</option>

								<option value="Food">Food</option>
								<option value="Travel">Travel</option>
								<option value="Equipment">Equipment</option>
							</select>
						</div>
						<br />

						<div className="errorMsg">
							{this.state.validationErr.description}
						</div>
						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.descChangeHandler}
								type="text"
								className="form-control"
								name="description"
								placeholder="Description"
							/>
						</div>

						<br />
						<div className="errorMsg">{this.state.validationErr.cost}</div>
						<div style={{ width: "30%" }} className="form-group">
							<input
								onChange={this.costChangeHandler}
								type="text"
								className="form-control"
								name="cost"
								placeholder="Cost"
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

export default AddExpense;
