import 'react-app-polyfill/ie11';
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import './index.css';
import App from './components/App/App';

const store = createStore(
	reducer,
	applyMiddleware(thunk)
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
