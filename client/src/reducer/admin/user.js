import {
    CONFIRM_ACTIVATE_USER_FAIL, CONFIRM_ACTIVATE_USER_REQUEST, CONFIRM_ACTIVATE_USER_SUCCESS,
    CONFIRM_DEACTIVATE_USER_FAIL, CONFIRM_DEACTIVATE_USER_REQUEST, CONFIRM_DEACTIVATE_USER_SUCCESS,
    USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS
} from "../../contant/admin/user";

function userListReducer(state = { userList: [] }, action) {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true, userList: [] }
        case USER_LIST_SUCCESS:
            return { loading: false, userList: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function confirmActivateUserReducer(state = { conformActivateUser: {} }, action) {
    switch (action.type) {
        case CONFIRM_ACTIVATE_USER_REQUEST:
            return { loading: true, conformActivateUser: {} }
        case CONFIRM_ACTIVATE_USER_SUCCESS:
            return { loading: false, conformActivateUser: action.payload }
        case CONFIRM_ACTIVATE_USER_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function confirmDeActivateUserReducer(state = { conformDeActivateUser: {} }, action) {
    switch (action.type) {
        case CONFIRM_DEACTIVATE_USER_REQUEST:
            return { loading: true, conformDeActivateUser: {} }
        case CONFIRM_DEACTIVATE_USER_SUCCESS:
            return { loading: false, conformDeActivateUser: action.payload }
        case CONFIRM_DEACTIVATE_USER_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export {
    userListReducer, confirmActivateUserReducer, confirmDeActivateUserReducer
};