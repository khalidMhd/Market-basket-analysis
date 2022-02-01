import Axios from "axios";
import Cookie from 'js-cookie'
import {
  CONFIRM_ACTIVATE_USER_FAIL, CONFIRM_ACTIVATE_USER_REQUEST,CONFIRM_ACTIVATE_USER_SUCCESS,
  CONFIRM_DEACTIVATE_USER_FAIL,CONFIRM_DEACTIVATE_USER_REQUEST,CONFIRM_DEACTIVATE_USER_SUCCESS,
  USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS
} from "../../contant/admin/user";

const adminInfo = Cookie.getJSON("adminInfo") || null
if (adminInfo) {
  Axios.defaults.headers.common.Authorization = adminInfo?.token
}

const userList = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST })
  Axios.get('/api/admin/user').then(data => {
    dispatch({ type: USER_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: USER_LIST_FAIL, payload: error.response.data })
  })
}

const confirmDeactivateUser = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_DEACTIVATE_USER_REQUEST, payload:{id} })
  Axios.post('/api/admin/activate-user/'+id).then(data => {
    dispatch({ type: CONFIRM_DEACTIVATE_USER_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_DEACTIVATE_USER_FAIL, payload: error.response.data })
  })
}

const confirmActivateUser = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_ACTIVATE_USER_REQUEST, payload:{id} })
  Axios.post('/api/admin/activate-user/'+id).then(data => {
    dispatch({ type: CONFIRM_ACTIVATE_USER_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_ACTIVATE_USER_FAIL, payload: error.response.data })
  })
}

export { userList, confirmDeactivateUser, confirmActivateUser }
