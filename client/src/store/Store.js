import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import {
    accountConformationReducer, forgotPasswordReducer,
    newPasswordReduser, signinReducer, signupReducer
} from '../reducer/auth'
import { premiumRequestReducer } from '../reducer/premium'

const userInfo = Cookie.getJSON("userInfo") || null

const initialState = { userSignin: { userInfo }, }
const reducer = combineReducers({
    userSignin: signinReducer,
    userSignup: signupReducer,
    accountConformationRed: accountConformationReducer,
    forgotPasswordRed: forgotPasswordReducer,
    newPasswordRed: newPasswordReduser,
    premiumRequestRed:premiumRequestReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store