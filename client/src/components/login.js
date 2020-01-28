import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendLoginData, Notification } from '../common/action';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '', password: '' };
	}

	sendData = (data) => {
		const { name, password } = data;
		const { sendLoginData, Notification } = this.props;
		if (name !== '' && password !== '') {
			sendLoginData(data);
			return this.setState({ name: '', password: '' });
		} else {
			Notification('Field if empty');
			return setTimeout(() => {
				Notification(false);
			}, 3000);
		}
	};

	render() {
		const { name, password } = this.state;
		const { notification } = this.props;
		return (
			<div className="login-wrapper">
				<div className="info-block">
					<h1>GlobalLogin Sing In</h1>
				</div>
				<div className="login-form">
					<div className="form-wrapper">
						<div className="inputs">
							<p>User Name</p>
							<input
								value={name}
								type="text"
								className="login-input"
								onChange={(e) => this.setState({ name: e.target.value })}
							/>
						</div>
						<div className="inputs">
							<p>Password</p>
							<input
								value={password}
								type="password"
								className="login-input"
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</div>
						<div className="btn-wrapper">
							<button className="login-btn" onClick={() => this.sendData({ name, password })}>
								Log In
							</button>
						</div>
						{notification && (
							<div className="notification-wrapper">
								<p>{notification}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { notification } = state;
	return { notification };
};

const mapDispatchToProps = { sendLoginData, Notification };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
