import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFiles } from '../common/action';

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
			<div>
				<button onClick={() => loadFiles()}>Download files</button>
				<button onClick={() => this.logout()}>Log Out</button>
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
