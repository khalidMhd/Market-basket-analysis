import Axios from "axios";
import Cookie from 'js-cookie'
import { PRODUCT_ASSOCIATION_FAIL, PRODUCT_ASSOCIATION_REQUEST, PRODUCT_ASSOCIATION_SUCCESS } from "../contant/association";

const userInfo = Cookie.getJSON("userInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": userInfo?.token
}

const productAssociationAction = (apiKey , file) => async (dispatch) => {
  dispatch({ type: PRODUCT_ASSOCIATION_REQUEST, payload: { file } })
  Axios.post(`/api/${apiKey}`, file, { headers }).then(data => {
    dispatch({ type: PRODUCT_ASSOCIATION_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: PRODUCT_ASSOCIATION_FAIL, payload: error.response.data })
  })
}

export { productAssociationAction }
