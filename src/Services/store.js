
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'
import rootReducer from './index';

const middlewares = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, {}, middlewares)
export default store