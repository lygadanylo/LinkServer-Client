import React, { Component } from 'react';
import { connect } from 'react-redux';
import { featchUsers, deletUser } from '../common/action';

class UserTable extends Component {
	componentDidMount() {
		const { featchUsers } = this.props;
		featchUsers();
	}
	render() {
		const { users, deletUser } = this.props;
		return (
			<div className="table-wrapper">
				<table className="table">
					<tr>
						<th>User Id</th>
						<th>User Name</th>
						<th>User Class</th>
						<th>Action</th>
					</tr>
					{users &&
						users.map((elem, index) => {
							return (
								<tr key={index}>
									<th>{elem.id}</th>
									<th>{elem.userName}</th>
									<th>{elem.userClass}</th>
									<th>
										<button className="delete-btn" onClick={() => deletUser({ id: elem.id })}>
											Delete
										</button>
									</th>
								</tr>
							);
						})}
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { users } = state;
	return { users };
};

const mapDispatchToProps = { featchUsers, deletUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
