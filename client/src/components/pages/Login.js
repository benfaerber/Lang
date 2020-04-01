import React, { Component, setState } from 'react';

import {Card, CardImg, CardText, CardBody, CardHeader,
	CardTitle, CardSubtitle, Row, Col, Button, Spinner, Alert} from 'reactstrap';
import TextInput from '../TextInput';
import Title from '../nav/Title';
import Post from '../Post';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggingIn: false,
			showError: false
		}
	}

	onSubmit = async () => {
		this.setState({loggingIn: true});
		let url = "http://localhost:8080/api/login";
		let obj = {
			username: document.querySelector("#username").value,
			password: document.querySelector("#password").value
		}
		let data = await Post(url, obj);

		if (!data || data.status === 'error') {
			this.setState({showError: true, loggingIn: false});
		} else {
			console.log("Logged in!");
		}
	}

	render() {
		return (
			<>
			<Title />
			<Row className="justify-content-center">
				<Col sm="12" md="6" lg="6">
					<Card>
						<CardHeader>
							Login
						</CardHeader>
						<Card body>
							<TextInput name="username" placeholder="john.smith" onChange={this.onChange}/>
							<TextInput name="password" type="password" placeholder="*********"  onChange={this.onChange}/>
							<Button color="success" id="submitButton" onClick={this.onSubmit}>
								{
								this.state.loggingIn ?
								<>Logging In <Spinner color="light" size="sm" /></> :
								<>Login</>
								}
							</Button>
						</Card>
					</Card>
				</Col>
			</Row>
			{this.state.showError ?
			<>
			<br />
			<Row className="justify-content-center">
				<Col sm="12" md="6" lg="6">
				<div className="alert alert-danger" role="alert">
					Incorrect username or password!
				</div>
				</Col>
			</Row>
			</>
			: ""}
			<br/>
			</>
    );
	}
}

export default Login;
