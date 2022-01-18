import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './../App.css';
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import uplaodImg from './assets/setting.png'

const ProfileScreen = (props) => {
    const dispatch = useDispatch()
    const [currentPassword, setCurrentPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState("")
    const [updatePassword, setUpdatePassword] = useState("")

    return (
        <div>
            <Navbar />
            <main >

                <div className=" m-4">
                    <ToastContainer />
                    <div className='cart shadow bg-white rounded'>
                        <div className='border border-top-0 border-left-0 border-right-0 '>
                            <h5 className="text-muted text-center pt-4 pb-4 pl-4">Change Password</h5>
                        </div>

                        <div className="row justify-content-around my-3" >
                            <div className="col-sm-4 d-flex align-items-center justify-content-center">
                                <img width="40%" src={uplaodImg} />
                            </div>

                            <form className='col-sm-6 py-3'>

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
                                    <button className="btn btn-secondary" onClick={() => props.history.push('/admin/dashboard')} style={{ width: '100px' }}>Cancel</button>
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