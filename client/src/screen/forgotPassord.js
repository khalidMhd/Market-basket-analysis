import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style/Login.css'
import $ from 'jquery'
import 'jquery-validation'
import logo from './assets/Logo.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import e from 'cors'
import { forgotPassword } from '../action/auth'
const ClientForgotPasswordScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")

    const forgotPasswordRed = useSelector(state => state.forgotPasswordRed);
    const { loading, forgotPass, error, success } = forgotPasswordRed


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }
    return (
        <div className="clientLogin ">

            <Navbar />
            <div className=" ">
                <div className='d-flex align-content-center flex-end justify-content-md-around justify-content-center' style={{ marginTop: "100px" }} >
                    <div className='cart shadow bg-white rounded col-sm-4 m-2'>
                        <form onSubmit={submitHandler} className="ibox-body p-3" id="login-form">
                            <h4 className="font-strong text-center">Reset Password</h4>
                            <p className='text-center'>Enter your email address, we will send you instructions to reset your password </p>
                            {loading &&
                                <div class="text-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            {error && <div className="text-danger text-center h6">{error.message}</div>}
                            {success && <div className="text-primary text-center h6">{forgotPass.message}</div>}

                            <div className="form-group mb-4">
                                <input className="form-control form-control-line" type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" required />
                            </div>

                            <div className="text-center pb-4">
                                <button type='submit' className="btn btn-success btn-rounded btn-block">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ClientForgotPasswordScreen


