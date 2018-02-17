import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from 'reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from 'app'
import 'what-input'
import 'sass/styles.scss'

const store = createStore(rootReducer, composeWithDevTools())

const root = document.getElementById('root')
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root
)
