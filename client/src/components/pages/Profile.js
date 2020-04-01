import React, { Component } from 'react';
import {Button} from 'reactstrap';
import Post from '../Post';

class Profile extends Component {
	getUser = async () => {
		let response = await Post('http://localhost:8080/api/getUser', {});
		console.log(response);
	}

	render() {
		return (
    <div>
			Profile
			<Button color="primary" onClick={this.getUser}>Get User</Button>
		</div>
    );
	}
}

export default Profile;
