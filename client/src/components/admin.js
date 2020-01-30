import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<button onClick={() => this.logout()}>Log Out</button>
			</div>
		);
	}
}
const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
