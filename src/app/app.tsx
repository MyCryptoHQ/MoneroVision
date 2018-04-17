import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, withRouter, Redirect, Router } from 'react-router';
import './app.scss';
import { Nav } from 'app/nav';
import { Footer } from 'app/footer';
import { Home } from 'app/home';
import { TxDetails } from 'app/details/tx-details';
import { BlockDetails } from 'app/details/block-details';
import { MemPool } from 'components/tables/mempool';
import { Blocks } from 'components/tables/blocks';
import { createBrowserHistory, createHashHistory } from 'history';
import { PageNotFound } from 'app/page-not-found';
import { ConfigureNode } from 'components/modals/configure-node';
import { AddNode } from 'components/modals/add-node';

export const RouteNotFound = () => <Redirect to={{ state: { error: true } }} />;

const CaptureRouteNotFound = withRouter(({ children, location }: any) => {
  return location && location.state && location.state.error ? (
    <PageNotFound />
  ) : (
    (children as JSX.Element)
  );
});

const h = process.env.NODE_ENV === 'production' ? createHashHistory() : createBrowserHistory();

h.listen(() => {
  window.scrollTo(0, 0);
});

const App = () => (
  <Router history={h}>
    <div className="App">
      <Nav />
      <main id="App-body" className="App-body">
        <ConfigureNode />
        <AddNode />
        <CaptureRouteNotFound>
          <Switch>
            {/* These routes are 'exact' because they have no subroutes, except for path='/' */}
            <Route exact={true} path="/" component={Home} />
            <Route
              exact={true}
              path="/mempool"
              render={({ location }) => <MemPool paginated={true} location={location} />}
            />
            <Route
              exact={true}
              path="/blocks"
              render={({ history, location }) => (
                <Blocks paginated={true} history={history} location={location} />
              )}
            />
            <Route exact={true} path="/tx/:transaction" component={TxDetails} />
            <Route exact={true} path="/block/:block" component={BlockDetails} />
            <RouteNotFound />
          </Switch>
        </CaptureRouteNotFound>
      </main>
      <div className="flex-spacer" />
      <Footer />
    </div>
  </Router>
);

export default hot(module)(App);
