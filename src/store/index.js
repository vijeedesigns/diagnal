import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import Reducer from "./reducer";

const middlewares = [thunk];

export const store = createStore(Reducer, applyMiddleware(...middlewares));