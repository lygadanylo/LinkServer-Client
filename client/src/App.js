import React, { Component } from 'react';
import Upload from './components/upload';
import Login from './components/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DOWNLOAD, LOGIN } from './common/routs';

class App extends Component {
	render() {
		return (
			<Router basename="/">
				<div className="App">
					<Switch>
						<Route exact path={DOWNLOAD} component={Upload} />
						<Route exact path={LOGIN} component={Login} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
