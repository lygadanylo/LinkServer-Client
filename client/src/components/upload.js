import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFiles } from '../common/action';

class Upload extends Component {
	render() {
		const { loadFiles } = this.props;
		return (
			<div>
				<button onClick={() => loadFiles()}>Download files</button>
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
