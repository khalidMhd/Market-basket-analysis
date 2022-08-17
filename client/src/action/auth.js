import Axios from "axios";
import Cookie from 'js-cookie'
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, USER_CONFORMATION_REQUEST, USER_CONFORMATION_SUCCESS, USER_CONFORMATION_FAIL, USER_FORGOT_PASSWORD_REQUEST, USER_FORGOT_PASSWORD_SUCCESS, USER_FORGOT_PASSWORD_FAIL, USER_NEW_PASSWORD_REQUEST, USER_NEW_PASSWORD_SUCCESS, USER_NEW_PASSWORD_FAIL,
} from "../contant/auth";

const userInfo = Cookie.getJSON("userInfo") || null
const headers = {
  'Content-Type': 'application/json',
  "Authorization": userInfo?.token
  }

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  Axios.post('http://localhost:5000/api/login', { email, password }).then(data => {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data })
    Cookie.set('userInfo', JSON.stringify(data.data))
  }).catch(error => {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data })
  })
}

const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });
  Axios.post("http://localhost:5000/api/register", { name, email, password }).then(data => {
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data });
  })
}

const accountConformation = (token) => async (dispatch) => {
  dispatch({ type: USER_CONFORMATION_REQUEST, payload: { token } });
  Axios.post("http://localhost:5000/api/confirmation/" + token).then(data => {
    dispatch({ type: USER_CONFORMATION_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: USER_CONFORMATION_FAIL, payload: error.response.data });
  })
}

const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: USER_FORGOT_PASSWORD_REQUEST, payload: { email } });
  Axios.post("http://localhost:5000/api/reset-password", {email}).then(data => {
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: error.response.data });
  })
}

const newPassword = (password, token) => async (dispatch) => {
  dispatch({ type: USER_NEW_PASSWORD_REQUEST, payload: { password, token } });
  Axios.post("http://localhost:5000/api/new-password", {password, token}).then(data => {
    dispatch({ type: USER_NEW_PASSWORD_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: USER_NEW_PASSWORD_FAIL, payload: error.response.data });
  })
}

const changePassword = (id,password, newPassword) => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: {id, password, newPassword } });
  Axios.post("http://localhost:5000/api/change-password/"+id, {password, newPassword}, { headers }).then(data => {
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.data });
  }).catch(error => {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data });
  })
}

export { signin, signup, accountConformation, forgotPassword, newPassword, changePassword};