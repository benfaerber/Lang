import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import Header from './components/nav/Header';
import Footer from './components/nav/Footer';

import Home from './components/pages/Home';
import Requests from './components/pages/Requests';
import RequestTranslation from './components/pages/RequestTranslation';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Post from './components/Post';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			user: null
		}
	}

	onLogin = async user => {
		console.log(user);
		this.setState({loggedIn: true, user:user});
	}

	onSignout = () => {
		this.setState({loggedIn: false, user:null});
	}

	render() {
		return (
			<div className="App">
				<Router>
				<Header user={this.state.user} loggedIn={this.state.loggedIn} onSignout={this.onSignout}/>
				<div className="MainContent">
					<Switch>
						<Route path="/requests"><Requests /></Route>
						<Route path="/request"><RequestTranslation /></Route>
						<Route path="/profile"><Profile /></Route>
						<Route path="/login"><Login onLogin={this.onLogin}/></Route>
						<Route path="/register"><Register /></Route>
						<Route path="/"><Home/></Route>
					</Switch>
				</div>
				<Footer />
				</Router>
			</div>
		);
	}
}
export default App;
