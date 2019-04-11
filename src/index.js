import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store';
import createHistory from 'history/createBrowserHistory';
import Home from './containers/Home';
import User from './containers/User';

const history = createHistory();

const App = () => (
	<div>
		{/* <div className="text-warning padding-less text-center text-small">Machinable is in Alpha. Data will be cleared regularly.</div> */}
		<Router history={history}>
			<Switch>
				<Route path="/login" component={User} />
				<Route path="/register" component={User} />

				<Route path="/" component={Home} />
			</Switch>
		</Router>
	</div>
)

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));