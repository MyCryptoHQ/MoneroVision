import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, withRouter, Redirect, Router } from 'react-router'
import './app.scss'
import { Nav } from 'app/nav'
import { Footer } from 'app/footer'
import { Home } from 'app/home'
import { TxDetails } from 'app/details/tx-details'
import { BlockDetails } from 'app/details/block-details'
import { MemPool } from 'components/tables/mempool'
import { Blocks } from 'components/tables/blocks'
import { createBrowserHistory, createHashHistory } from 'history'
import { PageNotFound } from 'app/page-not-found'

export const RouteNotFound = () => <Redirect to={{ state: { error: true } }} />

const CaptureRouteNotFound = withRouter(({ children, location }: any) => {
	return location && location.state && location.state.error ? <PageNotFound /> : (children as JSX.Element)
})

const history = process.env.NODE_ENV === 'production' ? createHashHistory() : createBrowserHistory()
history.listen(() => {
	window.scrollTo(0, 0)
})

const App = () => (
	<Router history={history}>
		<div className="App">
			<Nav />
			<main id="App-body" className="App-body">
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
