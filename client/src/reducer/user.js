import { USER_REFRESH_FAIL, USER_REFRESH_REQUEST, USER_REFRESH_SUCCESS } from "../contant/user";

function userRefreshReducer(state = {userRef:{}}, action) {
    switch (action.type) {
        case USER_REFRESH_REQUEST:
            return { loading: true, userRef:{}}
        case USER_REFRESH_SUCCESS:
            return { loading: false, userRef: action.payload }
        case USER_REFRESH_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export {
    userRefreshReducer
};