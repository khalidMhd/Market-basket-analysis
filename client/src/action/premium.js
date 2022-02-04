import Axios from "axios";
import Cookie from 'js-cookie'
import { USER_PREMIUM_FAIL, USER_PREMIUM_REQUEST, USER_PREMIUM_SUCCESS } from "../contant/premium";

const userInfo = Cookie.getJSON("userInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": userInfo?.token
  }

const premiumRequest = () => async (dispatch) => {
  dispatch({ type: USER_PREMIUM_REQUEST})
  Axios.post('/api/request-premium', {}, { headers }).then(data => {
    dispatch({ type: USER_PREMIUM_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: USER_PREMIUM_FAIL, payload: error.response.data })
  })
}

export {premiumRequest}
