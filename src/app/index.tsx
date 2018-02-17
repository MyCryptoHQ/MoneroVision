import * as React from 'react'
import { hot } from 'react-hot-loader'
import './app.scss'
import { Router, Route } from 'react-router'
import { Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
)

const About = () => (
	<div>
		<h2>About</h2>
	</div>
)

const Topics = ({ match }: any) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>Rendering with React</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>Components</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic} />
		<Route exact path={match.url} render={() => <h3>Please select a topic.</h3>} />
	</div>
)

const Topic = ({ match }: any) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
)

const history = createBrowserHistory()

const App = () => (
	<div className="App">
		<header className="App-header">
			<h1 className="App-title">Welcome</h1>
		</header>
		<p className="App-intro">
			To get started, edit <span>src/App.js</span> and save to reload.
		</p>
		<Router history={history}>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/topics">Topics</Link>
					</li>
				</ul>

				<hr />

				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/topics" component={Topics} />
			</div>
		</Router>
	</div>
)

export default hot(module)(App)
