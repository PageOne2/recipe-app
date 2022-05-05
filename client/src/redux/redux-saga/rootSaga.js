import { all, call } from 'redux-saga/effects'

import { recipeSagas } from '../recipeReducer/recipe.sagas';
import { userSagas } from '../userReducer/user.sagas';

export default function* rootSaga() {
    yield all([
        call(recipeSagas),
        call(userSagas)
    ])
}