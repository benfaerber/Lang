import React, { Component } from 'react';

class Icon extends Component {
	getIcon() {
		return `fas fa-${this.props.i}`;
	}

	render() {
		return (
    <i className={this.getIcon()}></i>
    );
	}
}

export default Icon;
