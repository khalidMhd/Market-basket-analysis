import { USER_MESSAGE_FAIL, USER_MESSAGE_REQUEST, USER_MESSAGE_SUCCESS } from "../contant/message";

function messageRequestReducer(state = {}, action) {
    switch (action.type) {
        case USER_MESSAGE_REQUEST:
            return { loading: true }
        case USER_MESSAGE_SUCCESS:
            return { loading: false, success: true, messageReq: action.payload }
        case USER_MESSAGE_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export {
    messageRequestReducer
};