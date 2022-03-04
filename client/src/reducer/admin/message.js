import { CONFIRM_MESSAE_READ_FAIL, CONFIRM_MESSAE_READ_REQUEST, CONFIRM_MESSAE_READ_SUCCESS, MESSAGE_LIST_FAIL, MESSAGE_LIST_REQUEST, MESSAGE_LIST_SUCCESS } from "../../contant/admin/message";

function messageListReducer(state = {messageList:[]}, action) {
    switch (action.type) {
        case MESSAGE_LIST_REQUEST:
            return { loading: true, messageList:[] }
        case MESSAGE_LIST_SUCCESS:
            return { loading: false, success: true, messageList: action.payload }
        case MESSAGE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


function confirmMsgReadReducer(state = {}, action) {
    switch (action.type) {
        case CONFIRM_MESSAE_READ_REQUEST:
            return { msgReadLoading: true, msgReadSuccess: false, }
        case CONFIRM_MESSAE_READ_SUCCESS:
            return { msgReadLoading: false, msgReadSuccess: true, msgConfirmRead: action.payload }
        case CONFIRM_MESSAE_READ_FAIL:
            return { msgReadLoading: false, msgReadError: action.payload };
        default: return state;
    }
}


export {
    messageListReducer, confirmMsgReadReducer
};