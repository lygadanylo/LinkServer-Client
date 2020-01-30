import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendRegisterData } from '../common/action';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '', password: '', userRole: '' };
	}

	sendData = (data) => {
		const { sendRegisterData } = this.props;
		sendRegisterData(data);
		return this.setState({ name: ' ', password: ' ', userRole: ' ' });
	};

	render() {
		const { name, password, userRole } = this.state;
		return (
			<div className="form-wrapper">
				<div className="inputs">
					<p>User Name</p>
					<input
						value={name}
						className="add-input"
						onChange={(e) => this.setState({ name: e.target.value })}
					/>
				</div>
				<div className="inputs">
					<p>User Role</p>
					<input
						value={userRole}
						className="add-input"
						onChange={(e) => this.setState({ userRole: e.target.value })}
					/>
				</div>
				<div className="inputs">
					<p>Password</p>
					<input
						value={password}
						type="password"
						className="add-input"
						onChange={(e) => this.setState({ password: e.target.value })}
					/>
				</div>
				<div className="btn-wrapper">
					<button className="add-btn" onClick={() => this.sendData({ name, password, userRole })}>
						Add User
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = { sendRegisterData };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
