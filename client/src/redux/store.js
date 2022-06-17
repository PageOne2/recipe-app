import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux-saga/rootSaga';

import recipeReducer from './recipeReducer/recipeReducer';
import userReducer from './userReducer/userReducer';

const sagaMiddleware = createSagaMiddleware();
const combinedReducers = combineReducers({
    recipe: recipeReducer,
    user: userReducer
});
const rootReducer = (state, action) => {
    if (action.type === "user/logOut") {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export const store =  configureStore({
    reducer : rootReducer,
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);