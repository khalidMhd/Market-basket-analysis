import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './../App.css';
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import uplaodImg from './assets/setting.png'
import { changePassword } from "../action/auth";

const ProfileScreen = (props) => {
    const dispatch = useDispatch()
    const [currentPassword, setCurrentPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")
    
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo } = userSignin;

    const changePasswordRed = useSelector(state => state.changePasswordRed);
    const {loading, changePass, success, error } = changePasswordRed;

    const id = userInfo?.user?._id
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePassword(id,currentPassword, updatePassword))
    }

    return (
        <div>
            <Navbar />
            <main >

                <div className=" m-4">
                    <div className='cart shadow bg-white rounded'>
                        <div className='border border-top-0 border-left-0 border-right-0 '>
                            <h5 className="text-muted text-center pt-4 pb-4 pl-4">Change Password</h5>
                        </div>

                        <div className="row justify-content-around my-3" >
                            <div className="col-sm-4 d-flex align-items-center justify-content-center">
                                <img width="40%" src={uplaodImg} />
                            </div>

                            <form onSubmit={submitHandler} className='col-sm-6 py-3'>
                                {loading &&
                                    <div class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                                {error && <div className="text-danger text-center h6">{error.message}</div>}
                                {success && <div className="text-primary text-center h6">{changePass?.message}</div>}

                                <div className="form-group">
                                    <input type="password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} className="form-control" id="exampleInputPassword1" placeholder="Current Password" required />
                                </div>
                                <div className="form-group py-3">
                                    <input type="password" onChange={(e) => setUpdatePassword(e.target.value)} value={updatePassword} className="form-control" id="exampleInputPassword1" placeholder="New Password" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={(e) => setMatchPassword(e.target.value)} value={matchPassword} className={matchPassword !== updatePassword ? "form-control is-invalid" : "form-control"} id="validationServer03" placeholder="Confirm New Password" required />
                                    {matchPassword !== updatePassword &&
                                        <div className="invalid-feedback">
                                            Password not match.
                                        </div>
                                    }
                                </div>
                                <div className='pt-4 text-center'>
                                    <button type="submit" className="btn btn-success mr-3" style={{ width: '100px' }} disabled={matchPassword !== updatePassword}>Save</button>
                                    <button className="btn btn-secondary" onClick={() => props.history.push('/')} style={{ width: '100px' }}>Cancel</button>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </main>
        </div>
    )

}

export default ProfileScreen;