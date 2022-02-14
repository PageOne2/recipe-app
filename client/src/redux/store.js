import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from 'redux-saga'
import rootSaga from './recipeReducer/rootSaga'

import recipeReducer from './recipeReducer/recipeReducer'

const sagaMiddleware = createSagaMiddleware()

export const store =  configureStore({
    reducer : {
        recipe: recipeReducer
    },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)