import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux-saga/rootSaga';

import recipeReducer from './recipeReducer/recipeReducer';
import userReducer from './userReducer/userReducer';

const sagaMiddleware = createSagaMiddleware();

export const store =  configureStore({
    reducer : {
        recipe: recipeReducer,
        user: userReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);