import { combineReducers } from "redux";

import { MovieReducer } from "./movie-reducer";

const allReducers = combineReducers({
    MovieReducer
});

const rootReducer = (state, action) => {
    return allReducers(state, action);
};

export default rootReducer;
