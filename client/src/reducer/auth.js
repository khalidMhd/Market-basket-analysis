import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, USER_CONFORMATION_REQUEST, USER_CONFORMATION_SUCCESS, USER_CONFORMATION_FAIL, USER_FORGOT_PASSWORD_REQUEST, USER_FORGOT_PASSWORD_SUCCESS, USER_FORGOT_PASSWORD_FAIL, USER_NEW_PASSWORD_REQUEST, USER_NEW_PASSWORD_SUCCESS, USER_NEW_PASSWORD_FAIL,
} from "../contant/auth";

function signinReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        // case USER_LOGOUT:
        //     return {};
        default: return state;
    }
}

function signupReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}

function accountConformationReducer(state = {}, action) {
    switch (action.type) {
        case USER_CONFORMATION_REQUEST:
            return { loading: true }
        case USER_CONFORMATION_SUCCESS:
            return { loading: false, success: true, accConfirm: action.payload }
        case USER_CONFORMATION_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}

function forgotPasswordReducer(state = {}, action) {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return { loading: true }
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, success: true, forgotPass: action.payload }
        case USER_FORGOT_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}

function newPasswordReduser(state = {}, action) {
    switch (action.type) {
        case USER_NEW_PASSWORD_REQUEST:
            return { loading: true }
        case USER_NEW_PASSWORD_SUCCESS:
            return { loading: false, success: true, newPass: action.payload }
        case USER_NEW_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}


function PasswordEditReducer(state = { passwordEdit: {} }, action) {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return { loading: true, passwordEdit: {} }
        case UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, passwordEdit: action.payload }
        case UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export {
    signinReducer, signupReducer, accountConformationReducer, forgotPasswordReducer,
    newPasswordReduser
};