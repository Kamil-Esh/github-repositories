import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import {reposReducer} from './reducers/reposReducer'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    repos: reposReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))