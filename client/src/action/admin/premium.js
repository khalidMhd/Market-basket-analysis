import Axios from "axios";
import Cookie from 'js-cookie'
import { CONFIRM_BASIC_FAIL, CONFIRM_BASIC_REQUEST, CONFIRM_BASIC_SUCCESS, CONFIRM_PREMIUM_FAIL, CONFIRM_PREMIUM_REQUEST, CONFIRM_PREMIUM_SUCCESS, PREMIUM_LIST_FAIL, PREMIUM_LIST_REQUEST, PREMIUM_LIST_SUCCESS } from "../../contant/admin/premium";

const adminInfo = Cookie.getJSON("adminInfo") || null
if (adminInfo) {
  Axios.defaults.headers.common.Authorization = adminInfo?.token
}

const premiumListAction = () => async (dispatch) => {
  dispatch({ type: PREMIUM_LIST_REQUEST})
  Axios.get('/api/admin/request-premium').then(data => {
    dispatch({ type: PREMIUM_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: PREMIUM_LIST_FAIL, payload: error.response.data })
  })
}

const confirmPremiumAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_PREMIUM_REQUEST, payload:{id}})
  Axios.post('/api/admin/confirm-premium/'+id).then(data => {
    dispatch({ type: CONFIRM_PREMIUM_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_PREMIUM_FAIL, payload: error.response.data })
  })
}

const confirmBasic = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_BASIC_REQUEST, payload:{id}})
  Axios.post('/api/admin/confirm-basic/'+id).then(data => {
    dispatch({ type: CONFIRM_BASIC_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_BASIC_FAIL, payload: error.response.data })
  })
}

export {premiumListAction, confirmPremiumAction, confirmBasic}
