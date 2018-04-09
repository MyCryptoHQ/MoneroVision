import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import './app.scss'
import { Nav } from 'app/nav'
import { Footer } from 'app/footer'
import { Home } from 'app/home'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { TxDetails } from 'app/details/tx-details'
import { BlockDetails } from 'app/details/block-details'
import { MemPool } from 'components/tables/mempool'
import { Blocks } from 'components/tables/blocks'

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

const App = () => (
	<Router>
		<div className="App">
			<Nav />
			<div className="App-body">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/mempool" render={() => <MemPool paginated={true} />} />
					<Route path="/blocks" render={() => <Blocks paginated={true} />} />
					<Route path="/tx/:transaction" component={TxDetails} />
					<Route path="/block/:block" component={BlockDetails} />
				</Switch>
			</div>
			<div className="flex-spacer" />
			<Footer />
		</div>
	</Router>
)

export default hot(module)(App)
