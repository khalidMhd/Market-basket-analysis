import Axios from "axios";
import Cookie from 'js-cookie'
import {
  ADMIN_LIST_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_REFRESH_FAIL,
  ADMIN_REFRESH_REQUEST,
  ADMIN_REFRESH_SUCCESS,
  CONFIRM_ACTIVATE_ADMIN_FAIL,
  CONFIRM_ACTIVATE_ADMIN_REQUEST,
  CONFIRM_ACTIVATE_ADMIN_SUCCESS,
  CONFIRM_ACTIVATE_USER_FAIL, CONFIRM_ACTIVATE_USER_REQUEST, CONFIRM_ACTIVATE_USER_SUCCESS,
  CONFIRM_DEACTIVATE_ADMIN_FAIL,
  CONFIRM_DEACTIVATE_ADMIN_REQUEST,
  CONFIRM_DEACTIVATE_ADMIN_SUCCESS,
  CONFIRM_DEACTIVATE_USER_FAIL, CONFIRM_DEACTIVATE_USER_REQUEST, CONFIRM_DEACTIVATE_USER_SUCCESS,
  USERFILE_LIST_FAIL, USERFILE_LIST_REQUEST, USERFILE_LIST_SUCCESS,
  USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS
} from "../../contant/admin/user";

const adminInfo = Cookie.getJSON("adminInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": adminInfo?.token
}

const userListAction = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST })
  Axios.get('/api/admin/user', { headers }).then(data => {
    dispatch({ type: USER_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: USER_LIST_FAIL, payload: error.response.data })
  })
}

const adminListAction = () => async (dispatch) => {
  dispatch({ type: ADMIN_LIST_REQUEST })
  Axios.get('/api/admin/admin', { headers }).then(data => {
    dispatch({ type: ADMIN_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: ADMIN_LIST_FAIL, payload: error.response.data })
  })
}

const adminRefreshAction = () => async (dispatch) => {
  dispatch({ type: ADMIN_REFRESH_REQUEST })
  Axios.get('/api/admin/refresh-admin', { headers }).then(data => {
    dispatch({ type: ADMIN_REFRESH_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: ADMIN_REFRESH_FAIL, payload: error.response.data })
  })
}

const userFileListAction = (id) => async (dispatch) => {
  dispatch({ type: USERFILE_LIST_REQUEST, payload: { id } })
  Axios.get('/api/admin/user-file/' + id, { headers }).then(data => {
    dispatch({ type: USERFILE_LIST_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: USERFILE_LIST_FAIL, payload: error.response.data })
  })
}

const confirmDeactivateAdminAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_DEACTIVATE_ADMIN_REQUEST, payload: { id } })
  Axios.post('/api/admin/de-activate-admin/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_DEACTIVATE_ADMIN_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_DEACTIVATE_ADMIN_FAIL, payload: error.response.data })
  })
}

const confirmActivateAdminAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_ACTIVATE_ADMIN_REQUEST, payload: { id } })
  Axios.post('/api/admin/activate-admin/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_ACTIVATE_ADMIN_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_ACTIVATE_ADMIN_FAIL, payload: error.response.data })
  })
}

const confirmDeactivateUserAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_DEACTIVATE_USER_REQUEST, payload: { id } })
  Axios.post('/api/admin/de-activate-user/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_DEACTIVATE_USER_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_DEACTIVATE_USER_FAIL, payload: error.response.data })
  })
}

const confirmActivateUserAction = (id) => async (dispatch) => {
  dispatch({ type: CONFIRM_ACTIVATE_USER_REQUEST, payload: { id } })
  Axios.post('/api/admin/activate-user/' + id, {}, { headers }).then(data => {
    dispatch({ type: CONFIRM_ACTIVATE_USER_SUCCESS, payload: data.data })
  }).catch(error => {
    dispatch({ type: CONFIRM_ACTIVATE_USER_FAIL, payload: error.response.data })
  })
}

export {
  userListAction, confirmDeactivateUserAction, adminListAction,
  confirmActivateUserAction, userFileListAction, adminRefreshAction,
  confirmDeactivateAdminAction, confirmActivateAdminAction
}
