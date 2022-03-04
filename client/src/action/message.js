import Axios from "axios";
import Cookie from 'js-cookie'
import { USER_MESSAGE_FAIL, USER_MESSAGE_REQUEST, USER_MESSAGE_SUCCESS } from "../contant/message";

const userInfo = Cookie.getJSON("userInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": userInfo?.token
  }

const messageRequest = ( file) => async (dispatch) => {
  dispatch({ type: USER_MESSAGE_REQUEST, payload:{file}})
  Axios.post('/api/message', file, { headers }).then(data => {
    dispatch({ type: USER_MESSAGE_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: USER_MESSAGE_FAIL, payload: error.response.data })
  })
}

export {messageRequest}
