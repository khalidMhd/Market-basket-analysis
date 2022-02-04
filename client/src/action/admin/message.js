import Axios from "axios";
import Cookie from 'js-cookie'
import { MESSAGE_LIST_FAIL, MESSAGE_LIST_REQUEST, MESSAGE_LIST_SUCCESS } from "../../contant/admin/message";

const adminInfo = Cookie.getJSON("adminInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": adminInfo?.token
  }

const messageListAction = () => async (dispatch) => {
  dispatch({ type: MESSAGE_LIST_REQUEST})
  Axios.get('/api/admin/message', { headers }).then(data => {
    dispatch({ type: MESSAGE_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: MESSAGE_LIST_FAIL, payload: error.response.data })
  })
}

export {messageListAction}
