import { PRODUCT_ASSOCIATION_FAIL, PRODUCT_ASSOCIATION_REQUEST, PRODUCT_ASSOCIATION_SUCCESS } from "../contant/association";

function productAssociationtReducer(state = {}, action) {
    switch (action.type) {
        case PRODUCT_ASSOCIATION_REQUEST:
            return { loading: true }
        case PRODUCT_ASSOCIATION_SUCCESS:
            return { loading: false, success: true, frequentItems: action.payload }
        case PRODUCT_ASSOCIATION_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}


export {
    productAssociationtReducer
};