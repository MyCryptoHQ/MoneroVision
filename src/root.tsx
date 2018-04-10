import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from 'redux/root-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadState, saveState } from './localstorage'
import App from 'app/app'
import 'what-input'
import 'typeface-roboto-mono'
import 'typeface-roboto'
import 'sass/styles.scss'

const store = createStore(rootReducer, loadState(), composeWithDevTools())

store.subscribe(() => {
	saveState({
		nodes: store.getState().nodes,
	})
})

const root = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root,
)
