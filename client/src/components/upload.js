import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadFiles } from '../common/action';
import UserTable from './usersTable';

class Upload extends Component {
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

	render() {
		const { loadFiles } = this.props;
		return (
			<Fragment>
				<div>
					<button onClick={() => this.logout()}>Log Out</button>
					<button onClick={() => loadFiles('110002225554477')}>Download files</button>
				</div>
				<UserTable />
			</Fragment>
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
