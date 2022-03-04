import {
    ADMIN_LIST_FAIL,
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_REFRESH_FAIL,
    ADMIN_REFRESH_REQUEST,
    ADMIN_REFRESH_SUCCESS,
    CONFIRM_ACTIVATE_ADMIN_FAIL,
    CONFIRM_ACTIVATE_ADMIN_REQUEST,
    CONFIRM_ACTIVATE_ADMIN_SUCCESS,
    CONFIRM_ACTIVATE_USER_FAIL, CONFIRM_ACTIVATE_USER_REQUEST, CONFIRM_ACTIVATE_USER_SUCCESS,
    CONFIRM_DEACTIVATE_ADMIN_FAIL,
    CONFIRM_DEACTIVATE_ADMIN_REQUEST,
    CONFIRM_DEACTIVATE_ADMIN_SUCCESS,
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

function adminListReducer(state = { adminList: [] }, action) {
    switch (action.type) {
        case ADMIN_LIST_REQUEST:
            return { adminListLoading: true, adminList: [] }
        case ADMIN_LIST_SUCCESS:
            return { adminListLoading: false, adminList: action.payload }
        case ADMIN_LIST_FAIL:
            return { adminListLoading: false, adminListLError: action.payload };
        default: return state;
    }
}

function adminRefreshReducer(state = { adminRefresh: {} }, action) {
    switch (action.type) {
        case ADMIN_REFRESH_REQUEST:
            return { loading: true, adminRefresh: {} }
        case ADMIN_REFRESH_SUCCESS:
            return { loading: false, adminRefresh: action.payload }
        case ADMIN_REFRESH_FAIL:
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

function confirmActivateAdminReducer(state = { conformActivateAdmin: {} }, action) {
    switch (action.type) {
        case CONFIRM_ACTIVATE_ADMIN_REQUEST:
            return { adminActivateLoading: true, adminActivateSuccess: false, conformActivateAdmin: {} }
        case CONFIRM_ACTIVATE_ADMIN_SUCCESS:
            return { adminActivateLoading: false, adminActivateSuccess: true, conformActivateAdmin: action.payload }
        case CONFIRM_ACTIVATE_ADMIN_FAIL:
            return { adminActivateLoading: false, adminActivateError: action.payload };
        default: return state;
    }
}

function confirmDeActivateAdminReducer(state = { conformDeActivateAdmin: {} }, action) {
    switch (action.type) {
        case CONFIRM_DEACTIVATE_ADMIN_REQUEST:
            return { adminDeActivateLoading: true, adminDeActivateSuccess: false, conformDeActivateAdmin: {} }
        case CONFIRM_DEACTIVATE_ADMIN_SUCCESS:
            return { adminDeActivateLoading: false, adminDeActivateSuccess: true, conformDeActivateAdmin: action.payload }
        case CONFIRM_DEACTIVATE_ADMIN_FAIL:
            return { adminDeActivateLoading: false, adminDeActivateError: action.payload };
        default: return state;
    }
}


export {
    userListReducer, confirmActivateUserReducer, adminListReducer,
    confirmDeActivateUserReducer, userFileListReducer, adminRefreshReducer,
    confirmActivateAdminReducer, confirmDeActivateAdminReducer
};