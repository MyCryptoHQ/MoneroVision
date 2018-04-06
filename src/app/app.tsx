import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import './app.scss'
import { Nav } from 'app/nav'
import { Footer } from 'app/footer'
import { Home } from 'app/home'
import { BrowserRouter } from 'react-router-dom'
import { TxDetails } from 'app/tx-details'
import { BlockDetails } from 'app/block-details'

const App = () => (
	<BrowserRouter>
		<div className="App">
			<Nav />
			<div className="App-body">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/tx/:transaction" onChange={() => console.log('foo')} component={TxDetails} />
					<Route path="/block/:block" component={BlockDetails} />
				</Switch>
			</div>
			<div className="flex-spacer" />
			<Footer />
		</div>
	</BrowserRouter>
)

export default hot(module)(App)
