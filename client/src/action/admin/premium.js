import Axios from "axios";
import Cookie from 'js-cookie'
import { CONFIRM_BASIC_FAIL, CONFIRM_BASIC_REQUEST, CONFIRM_BASIC_SUCCESS, CONFIRM_PREMIUM_FAIL, CONFIRM_PREMIUM_REQUEST, CONFIRM_PREMIUM_SUCCESS, CONFIRM_READ_FAIL, CONFIRM_READ_REQUEST, CONFIRM_READ_SUCCESS, PREMIUM_LIST_FAIL, PREMIUM_LIST_REQUEST, PREMIUM_LIST_SUCCESS } from "../../contant/admin/premium";

const adminInfo = Cookie.getJSON("adminInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": adminInfo?.token
}

const premiumListAction = () => async (dispatch) => {
  dispatch({ type: PREMIUM_LIST_REQUEST })
  Axios.get('http://localhost:5000/api/admin/request-premium', { headers }).then(data => {
    dispatch({ type: PREMIUM_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: PREMIUM_LIST_FAIL, payload: error.response.data })
  })
}

const confirmPremiumAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_PREMIUM_REQUEST, payload: { id } })
  Axios.post('http://localhost:5000/api/admin/confirm-premium/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_PREMIUM_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_PREMIUM_FAIL, payload: error.response.data })
  })
}

const confirmBasicAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_BASIC_REQUEST, payload: { id } })
  Axios.post('http://localhost:5000/api/admin/confirm-basic/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_BASIC_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_BASIC_FAIL, payload: error.response.data })
  })
}

const confirmReadAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_READ_REQUEST, payload: { id } })
  Axios.post('http://localhost:5000/api/admin/confirm-read/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_READ_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_READ_FAIL, payload: error.response.data })
  })
}

export {
  premiumListAction, confirmPremiumAction, confirmBasicAction,
  confirmReadAction
}
