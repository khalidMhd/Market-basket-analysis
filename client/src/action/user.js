import Axios from "axios";
import Cookie from 'js-cookie'
import { USER_REFRESH_FAIL, USER_REFRESH_REQUEST, USER_REFRESH_SUCCESS } from "../contant/user";

const userInfo = Cookie.getJSON("userInfo") || null
if (userInfo) {
  Axios.defaults.headers.common.Authorization = userInfo?.token
}

const refreshUser = () => async (dispatch) => {
  dispatch({ type: USER_REFRESH_REQUEST})
  Axios.get('/api/refresh-user').then(data => {
    dispatch({ type: USER_REFRESH_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: USER_REFRESH_FAIL, payload: error.response.data })
  })
}

export {refreshUser}
