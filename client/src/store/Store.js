import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import {
    accountConformationReducer, changePasswordReducer, forgotPasswordReducer,
    newPasswordReduser, signinReducer, signupReducer
} from '../reducer/auth'
import { premiumRequestReducer } from '../reducer/premium'
import { messageRequestReducer } from '../reducer/message'
import { userRefreshReducer } from '../reducer/user'
import { adminChangePasswordReducer, adminSigninReducer, adminSignupReducer } from '../reducer/admin/auth'
import { messageListReducer } from '../reducer/admin/message'
import { confirmBasicReducer, confirmPremiumReducer, premiumListReducer } from '../reducer/admin/premium'
import { confirmActivateUserReducer, confirmDeActivateUserReducer, userListReducer } from '../reducer/admin/user'
import { productAssociationtReducer } from '../reducer/association'

const userInfo = Cookie.getJSON("userInfo") || null
const adminInfo = Cookie.getJSON("adminInfo") || null

const initialState = { userSignin: { userInfo }, adminSignin: { adminInfo } }
const reducer = combineReducers({
    userSignin: signinReducer,
    userSignup: signupReducer,
    accountConformationRed: accountConformationReducer,
    forgotPasswordRed: forgotPasswordReducer,
    newPasswordRed: newPasswordReduser,
    premiumRequestRed: premiumRequestReducer,
    messageRequestRed: messageRequestReducer,
    changePasswordRed: changePasswordReducer,
    userRefreshRed: userRefreshReducer,
    //admin
    adminSignin: adminSigninReducer,
    adminSignup: adminSignupReducer,
    adminChangePasswordRed: adminChangePasswordReducer,
    messageListRed: messageListReducer,
    premiumListRed: premiumListReducer,
    confirmPremiumRed: confirmPremiumReducer,
    confirmBasicRed: confirmBasicReducer,
    userListRed: userListReducer,
    confirmActivateUserRed: confirmActivateUserReducer,
    confirmDeActivateUserRed: confirmDeActivateUserReducer,
    //product association
    productAssociationtRed: productAssociationtReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store