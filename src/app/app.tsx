import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter, Redirect } from 'react-router'
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

export const RouteNotFound = () => <Redirect to={{ state: { error: true } }} />

const CaptureRouteNotFound = withRouter(({ children, location }: any) => {
	return location && location.state && location.state.error ? <div>foo bar</div> : (children as JSX.Element)
})

const App = () => (
	<Router>
		<div className="App">
			<Nav />
			<main className="App-body">
				<CaptureRouteNotFound>
					<Switch>
						{/* These routes are 'exact' because they have no subroutes, except for path='/' */}
						<Route exact path="/" component={Home} />
						<Route exact path="/mempool" render={({ location }) => <MemPool paginated={true} location={location} />} />
						<Route
							exact
							path="/blocks"
							render={({ history, location }) => <Blocks paginated={true} history={history} location={location} />}
						/>
						<Route exact path="/tx/:transaction" component={TxDetails} />
						<Route exact path="/block/:block" component={BlockDetails} />
						<RouteNotFound />
					</Switch>
				</CaptureRouteNotFound>
			</main>
			<div className="flex-spacer" />
			<Footer />
		</div>
	</Router>
)

export default hot(module)(App)
