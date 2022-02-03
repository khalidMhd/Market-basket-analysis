import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style/Login.css'
import logo from './assets/Logo.png'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { signup } from '../action/auth'
const ClientSignupScreen = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userSignup = useSelector(state => state.userSignup);
    const { loading, success, userInfo, error } = userSignup;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo: saveUserInfo } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password))
    }

    useEffect(() => {
        saveUserInfo ? props.history.push('/') : props.history.push('/signup')
    }, [saveUserInfo])

    return (
        <div className="clientLogin ">

            {/* <Navbar /> */}
            <div className=" ">
                <div className='d-flex align-content-center flex-end justify-content-md-around justify-content-center' style={{ marginTop: "100px" }} >
                    <div className='cart shadow bg-white rounded col-sm-4 m-2'>
                        <form onSubmit={submitHandler} className="ibox-body p-3" id="login-form">
                            <h4 className="font-strong text-center pb-4 ">Signup</h4>
                            {loading &&
                                <div class="text-center">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            } 
                            {error && <div className="text-danger text-center h6">{error.message}</div>}
                            {success && <div className="text-primary text-center h6">{userInfo.message}</div>}

                            <div className="form-group mb-4">
                                <input className="form-control form-control-line" type="text" onChange={(e) => setName(e.target.value)} name="name" placeholder="Name" required />
                            </div>
                            <div className="form-group mb-4">
                                <input className="form-control form-control-line" type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" required />
                            </div>
                            <div className="form-group mb-4">
                                <input className="form-control form-control-line" type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" required />
                            </div>

                            <div className="text-center pb-4">
                                <button type='submit' className="btn btn-success btn-rounded btn-block">Submit</button>
                            </div>
                            <div className="text-center">
                                have an Account? <Link to="/signin" >Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientSignupScreen


