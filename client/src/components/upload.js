import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFiles } from '../common/action';
import UserTable from './usersTable';
import Register from './registerUsers';

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = { sessionId: '' };
	}

	componentDidMount() {
		const token = localStorage.getItem('token');
		if (!token) {
			return this.logout();
		}
	}

	logout = () => {
		localStorage.clear();
		this.props.history.push('/');
	};

	sendData = (sessionId) => {
		const { loadFiles } = this.props;
		const props = this.props;
		loadFiles({ sessionId, props });
		return this.setState({ sessionId: ' ' });
	};

	render() {
		const { sessionId } = this.state;
		return (
			<div className="download-wrapper">
				<div className="admin-section">
					<div className="form-wrapper">
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
					<Register />
				</div>
				<UserTable />
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	loadFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
