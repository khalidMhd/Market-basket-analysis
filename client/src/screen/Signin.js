import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style/Login.css'
import $ from 'jquery'
import 'jquery-validation'
import logo from './assets/Logo.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { signin } from '../action/auth'
import axios from 'axios'

const ClientSigninScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userSignin = useSelector(state => state.userSignin);
    const { loading, success, userInfo, error } = userSignin;

    useEffect(() => {
            userInfo ? props.history.push('/') : props.history.push('/signin')
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    return (
        <div className="clientLogin ">

            {/* <Navbar /> */}
            <div className=" ">
                <div className='d-flex align-content-center flex-end justify-content-md-around justify-content-center' style={{ marginTop: "100px" }} >
                    <div className='cart shadow bg-white rounded col-sm-4 m-2'>
                        <form onSubmit={submitHandler} className="ibox-body p-3" id="login-form">
                            <h4 className="font-strong text-center pb-2 ">Login</h4>
                            {loading &&
                                <div class="text-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            {success && <div className="text-primary text-center h6">{userInfo.message}</div>}
                            {error && <div className="text-danger text-center h6">{error.message}</div>}
                            <div className="form-group mb-4">
                                <input className="form-control form-control-line" onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="form-group mb-4">
                                <input className="form-control form-control-line" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                                <div className="float-right">
                                    <Link to="/reset-password" >Forgot password?</Link>
                                </div>
                            </div>

                            <div className="text-center pb-4 pt-4">
                                <button type='submit' className="btn btn-success btn-rounded btn-block">Submit</button>
                            </div>
                            <div className="text-center">
                                Not a Member? <Link to="/signup" >Signup</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ClientSigninScreen


