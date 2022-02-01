import { USER_PREMIUM_FAIL, USER_PREMIUM_REQUEST, USER_PREMIUM_SUCCESS } from "../contant/premium";

function premiumRequestReducer(state = {}, action) {
    switch (action.type) {
        case USER_PREMIUM_REQUEST:
            return { loading: true }
        case USER_PREMIUM_SUCCESS:
            return { loading: false, success: true, premiumReq: action.payload }
        case USER_PREMIUM_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export {
    premiumRequestReducer
};