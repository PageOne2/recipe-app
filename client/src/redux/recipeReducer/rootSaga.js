import { all, call } from 'redux-saga/effects'

import { recipeSagas } from './recipe.sagas'

export default function* rootSaga() {
    yield all([
        call(recipeSagas)
    ])
}