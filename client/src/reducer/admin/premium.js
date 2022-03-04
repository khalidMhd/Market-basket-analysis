import { failedToTransformError } from "simple-excel-to-json";
import {
    CONFIRM_BASIC_FAIL, CONFIRM_BASIC_REQUEST, CONFIRM_BASIC_SUCCESS,
    CONFIRM_PREMIUM_FAIL, CONFIRM_PREMIUM_REQUEST, CONFIRM_PREMIUM_SUCCESS,
    CONFIRM_READ_FAIL,
    CONFIRM_READ_REQUEST,
    CONFIRM_READ_SUCCESS,
    PREMIUM_LIST_FAIL, PREMIUM_LIST_REQUEST, PREMIUM_LIST_SUCCESS
} from "../../contant/admin/premium";

function premiumListReducer(state = { premiumList: [] }, action) {
    switch (action.type) {
        case PREMIUM_LIST_REQUEST:
            return { loading: true, premiumList: [] }
        case PREMIUM_LIST_SUCCESS:
            return { loading: false, success: true, premiumList: action.payload }
        case PREMIUM_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


function confirmPremiumReducer(state = {}, action) {
    switch (action.type) {
        case CONFIRM_PREMIUM_REQUEST:
            return { premiumLoading: true, premiumSuccess:false }
        case CONFIRM_PREMIUM_SUCCESS:
            return { premiumLoading: false, premiumSuccess: true, confirmPremium: action.payload }
        case CONFIRM_PREMIUM_FAIL:
            return { premiumLoading: false, premiumError: action.payload };
        default: return state;
    }
}

function confirmBasicReducer(state = {}, action) {
    switch (action.type) {
        case CONFIRM_BASIC_REQUEST:
            return { basicLoading: true, basicSuccess: false, }
        case CONFIRM_BASIC_SUCCESS:
            return { basicLoading: false, basicSuccess: true, confirmBasic: action.payload }
        case CONFIRM_BASIC_FAIL:
            return { basicLoading: false, basicError: action.payload };
        default: return state;
    }
}

function confirmReadReducer(state = {}, action) {
    switch (action.type) {
        case CONFIRM_READ_REQUEST:
            return { readLoading: true, readSuccess: false, }
        case CONFIRM_READ_SUCCESS:
            return { readLoading: false, readSuccess: true, confirmRead: action.payload }
        case CONFIRM_READ_FAIL:
            return { readLoading: false, readError: action.payload };
        default: return state;
    }
}

export {
    premiumListReducer, confirmPremiumReducer, confirmBasicReducer,
    confirmReadReducer
};