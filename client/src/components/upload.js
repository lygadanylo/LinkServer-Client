import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFiles, LogOut } from '../common/action';
import UserTable from './usersTable';
import Register from './registerUsers';

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = { sessionId: '', userClass: '' };
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		const usersClass = localStorage.getItem('userClass');
		this.setClass(usersClass);
		if (!token) {
			return this.logout();
		}
	}

	setClass = (usersClass) => {
		this.setState({ userClass: usersClass });
	};

	logout = () => {
		const { LogOut } = this.props;
		const token = localStorage.getItem('token');
		const props = this.props;
		LogOut({ token, props });
	};

	sendData = (sessionId) => {
		const { loadFiles } = this.props;
		const props = this.props;
		loadFiles({ sessionId, props });
		return this.setState({ sessionId: ' ' });
	};

	render() {
		const { sessionId, userClass } = this.state;
		return (
			<div className="download-wrapper">
				<div className="admin-section">
					<div className="form-wrapper admin-controller">
						<div className="inputs">
							<h1>User Session Id</h1>
							<input
								value={sessionId}
								type="number"
								name="sessionId"
								className="sessionid-input"
								onChange={(e) => this.setState({ sessionId: e.target.value })}
							/>
						</div>
						<div className="btn-wrapper">
							<button className="download-btn" onClick={() => this.sendData(sessionId)}>
								Download LinkServer log file
							</button>
						</div>
					</div>
					{userClass === 'admin' && <Register />}
				</div>
				{userClass === 'admin' && <UserTable />}
				<button className="logout" onClick={() => this.logout()}>
					Log Out
				</button>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	loadFiles,
	LogOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
