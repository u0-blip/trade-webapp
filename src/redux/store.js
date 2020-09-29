import { createStore, combineReducers, applyMiddleware, compose } from 'redux';


import thunkMiddleware from 'redux-thunk';
import dataReducer from './reducers/dataReducer.js';
import userReducer from './reducers/userReducer';
import UIReducer from './reducers/UIReducer';

const reducers = combineReducers({
    data: dataReducer,
    user: userReducer,
    UI: UIReducer,
});


const initialState = {};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const middleware = [thunkMiddleware];
const enhancers = [applyMiddleware(...middleware)];
const enhancer = composeEnhancers(...enhancers);

const store = createStore(reducers, initialState, enhancer)

export default store;