import {
    CONFIRM_ACTIVATE_USER_FAIL, CONFIRM_ACTIVATE_USER_REQUEST, CONFIRM_ACTIVATE_USER_SUCCESS,
    CONFIRM_DEACTIVATE_USER_FAIL, CONFIRM_DEACTIVATE_USER_REQUEST, CONFIRM_DEACTIVATE_USER_SUCCESS,
    USERFILE_LIST_FAIL, USERFILE_LIST_REQUEST, USERFILE_LIST_SUCCESS,
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

function userFileListReducer(state = { userFileList: [] }, action) {
    switch (action.type) {
        case USERFILE_LIST_REQUEST:
            return { loading: true, userFileList: [] }
        case USERFILE_LIST_SUCCESS:
            return { loading: false, userFileList: action.payload }
        case USERFILE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function confirmActivateUserReducer(state = { conformActivateUser: {} }, action) {
    switch (action.type) {
        case CONFIRM_ACTIVATE_USER_REQUEST:
            return { activateLoading: true, activateSuccess: false, conformActivateUser: {} }
        case CONFIRM_ACTIVATE_USER_SUCCESS:
            return { activateLoading: false, activateSuccess: true, conformActivateUser: action.payload }
        case CONFIRM_ACTIVATE_USER_FAIL:
            return { activateLoading: false, activateError: action.payload };
        default: return state;
    }
}

function confirmDeActivateUserReducer(state = { conformDeActivateUser: {} }, action) {
    switch (action.type) {
        case CONFIRM_DEACTIVATE_USER_REQUEST:
            return { deActivateLoading: true, deActivateSuccess: false, conformDeActivateUser: {} }
        case CONFIRM_DEACTIVATE_USER_SUCCESS:
            return { deActivateLoading: false, deActivateSuccess: true, conformDeActivateUser: action.payload }
        case CONFIRM_DEACTIVATE_USER_FAIL:
            return { deActivateLoading: false, deActivateError: action.payload };
        default: return state;
    }
}


export {
    userListReducer, confirmActivateUserReducer,
    confirmDeActivateUserReducer, userFileListReducer
};