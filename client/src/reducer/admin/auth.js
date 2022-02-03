import { ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQUEST, ADMIN_SIGNUP_SUCCESS, ADMIN_UPDATE_PASSWORD_FAIL, ADMIN_UPDATE_PASSWORD_REQUEST, ADMIN_UPDATE_PASSWORD_SUCCESS } from "../../contant/admin/auth";

function adminSigninReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_SIGNIN_REQUEST:
            return { loading: true }
        case ADMIN_SIGNIN_SUCCESS:
            return { loading: false, success: true, adminInfo: action.payload }
        case ADMIN_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function adminSignupReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_SIGNUP_REQUEST:
            return { loading: true }
        case ADMIN_SIGNUP_SUCCESS:
            return { loading: false, success: true, adminSignupInfo: action.payload }
        case ADMIN_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}


function adminChangePasswordReducer(state = { adminChangePass: {} }, action) {
    switch (action.type) {
        case ADMIN_UPDATE_PASSWORD_REQUEST:
            return { loading: true, adminChangePass: {} }
        case ADMIN_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, adminChangePass: action.payload }
        case ADMIN_UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export {
    adminSigninReducer, adminSignupReducer, adminChangePasswordReducer
};