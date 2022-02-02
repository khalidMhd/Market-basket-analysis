import Axios from "axios";
import Cookie from 'js-cookie'
import {
  ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQUEST, ADMIN_SIGNUP_SUCCESS, ADMIN_UPDATE_PASSWORD_FAIL, ADMIN_UPDATE_PASSWORD_REQUEST, ADMIN_UPDATE_PASSWORD_SUCCESS
} from "../../contant/admin/auth";

const adminInfo = Cookie.getJSON("adminInfo") || null
if (adminInfo) {
  Axios.defaults.headers.common.Authorization = adminInfo?.token
}

const adminSigninAction = (email, password) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { email, password } })
  Axios.post('/api/admin/login', { email, password }).then(data => {
    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data.data })
    Cookie.set('adminInfo', JSON.stringify(data.data))
  }).catch(error => {
    dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.response.data })
  })
}

const adminSignup = (name, email, password, accessLevel) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNUP_REQUEST, payload: { name, email, password, accessLevel } });
  Axios.post("/api/admin/register", { name, email, password, accessLevel }).then(data => {
    dispatch({ type: ADMIN_SIGNUP_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: ADMIN_SIGNUP_FAIL, payload: error.response.data });
  })
}


const adminChangePassword = (id, password, newPassword,) => async (dispatch) => {
  dispatch({ type: ADMIN_UPDATE_PASSWORD_REQUEST, payload: { id, password, newPassword } });
  Axios.post("/api/admin/change-password/" + id, { password, newPassword }).then(data => {
    dispatch({ type: ADMIN_UPDATE_PASSWORD_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: ADMIN_UPDATE_PASSWORD_FAIL, payload: error.response.data });
  })
}

export { adminSigninAction, adminSignup, adminChangePassword };