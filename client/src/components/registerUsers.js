import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRegisterData } from '../common/action';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '', password: '' };
	}

	sendData = (data) => {
		const { sendRegisterData } = this.props;
		sendRegisterData(data);
	};

	render() {
		const { name, password } = this.state;
		return (
			<div className="register-wrapper">
				<h1>Name:</h1>
				<input onChange={(e) => this.setState({ name: e.target.value })} />
				<h1>Password:</h1>
				<input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
				<button onClick={() => this.sendData({ name, password })}>Send</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = { sendRegisterData };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
