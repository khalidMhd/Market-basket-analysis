import Axios from "axios";
import Cookie from 'js-cookie'
import { CONFIRM_MESSAE_READ_FAIL, CONFIRM_MESSAE_READ_REQUEST, CONFIRM_MESSAE_READ_SUCCESS, MESSAGE_LIST_FAIL, MESSAGE_LIST_REQUEST, MESSAGE_LIST_SUCCESS } from "../../contant/admin/message";

const adminInfo = Cookie.getJSON("adminInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": adminInfo?.token
  }

const messageListAction = () => async (dispatch) => {
  dispatch({ type: MESSAGE_LIST_REQUEST})
  Axios.get('http://localhost:5000/api/admin/message', { headers }).then(data => {
    dispatch({ type: MESSAGE_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: MESSAGE_LIST_FAIL, payload: error.response.data })
  })
}

const confirmMsgReadAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_MESSAE_READ_REQUEST, payload: { id } })
  Axios.post('http://localhost:5000/api/admin/confirm-msg-read/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_MESSAE_READ_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_MESSAE_READ_FAIL, payload: error.response.data })
  })
}


export {messageListAction, confirmMsgReadAction}
