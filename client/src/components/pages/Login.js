import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardHeader,
	CardTitle, CardSubtitle, Row, Col, Button} from 'reactstrap';
import TextInput from '../TextInput';
import Title from '../nav/Title';

class Login extends Component {
	render() {
		return (
			<>
			<Title />
			<Row className="justify-content-center">
				<Col sm="12" md="6" lg="6" ali>
					<Card>
						<CardHeader>
							Login
						</CardHeader>
						<Card body>
							<TextInput name="username" placeholder="john.smith"/>
							<TextInput name="password" type="password" placeholder="*********"/>
							<Button color="success">Login</Button>
						</Card>
					</Card>
				</Col>
			</Row>
			</>
    );
	}
}

export default Login;
