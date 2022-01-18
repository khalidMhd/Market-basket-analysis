import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style/Login.css'
import $ from 'jquery'
import 'jquery-validation'
import logo from './assets/Logo.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
const ClientSigninScreen = (props) => {

    return (
        <div className="clientLogin ">

            <Navbar />
            <div className=" ">
                <div className='d-flex align-content-center flex-end justify-content-md-around justify-content-center' style={{marginTop:"100px"}} >
                <div></div>
                <div className='cart shadow bg-white rounded col-sm-4 m-2'>
                    <form className="ibox-body p-3" id="login-form">
                        <h4 className="font-strong text-center pb-4 ">Login</h4>

                        <div className="form-group mb-4">
                            <input className="form-control form-control-line" type="text" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group mb-4">
                            <input className="form-control form-control-line" type="password" name="password" placeholder="Password" />
                            <div className="float-right">
                                <Link to="/reset-password" >Forgot password?</Link>
                            </div>
                        </div>

                        <div className="text-center pb-4 pt-4">
                            <button type='submit' onClick={() => props.history.push('/')} className="btn btn-success btn-rounded btn-block">Submit</button>
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


