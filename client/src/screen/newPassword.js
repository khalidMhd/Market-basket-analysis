import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style/Login.css'
import $ from 'jquery'
import 'jquery-validation'
import logo from './assets/Logo.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { newPassword } from '../action/auth'
const ClientNewPasswordScreen = (props) => {
    const dispatch = useDispatch()
    const token = props.match.params.token
    const [password, setPassword] = useState("")

    const newPasswordReduser = useSelector(state => state.newPasswordRed)
    const { loading, error, success, newPass } = newPasswordReduser

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(newPassword(password, token))
    }
    
    return (
        <div className="clientLogin ">

            {/* <Navbar /> */}
            <div className=" ">
                <div className='d-flex align-content-center flex-end justify-content-md-around justify-content-center' style={{ marginTop: "100px" }} >
                    <div className='cart shadow bg-white rounded col-sm-4 m-2'>
                        <form onSubmit={submitHandler} className="ibox-body p-3" id="login-form">
                            <h4 className="font-strong text-center pb-4 ">New Password</h4>
                            {loading &&
                                <div class="text-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            {error && <div className="text-danger text-center h6">{error.message}</div>}
                            {success ?
                                <>
                                    <div className="text-primary text-center h6">{newPass?.message}</div>
                                    <div className='text-center'>
                                        <Link to='/signin' className="btn btn-primary btn-sm" role="button">Continue to login</Link>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="form-group mb-4">
                                        <input className="form-control form-control-line" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="New Password" />
                                    </div>

                                    <div className="text-center pb-4">
                                        <button type='submit' className="btn btn-success btn-rounded btn-block">Submit</button>
                                    </div>
                                </>
                            }



                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientNewPasswordScreen


