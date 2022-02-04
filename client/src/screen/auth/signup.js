import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../action/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from '../admin/Navbar';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { adminSignupAction } from '../../action/admin/auth';

const SignupScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [accessLevel, setAccessLevel] = useState(1);
    const [visible, setVisible] = useState(true)

    const adminSignup = useSelector(state => state.adminSignup);
    const { loading, success, adminSignupInfo, error } = adminSignup;

    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminSignupAction(name, email, password, visible));
    }

    useEffect(() => {
        adminInfo ? props.history.push('/admin/add-user') : props.history.push('/admin/signin')
    }, [adminInfo])

    return (
        <div className='containerMain'>
            <Navbar />
            <main>
                <form onSubmit={submitHandler} className='card text-dark bg-white shadow rounded-lg mb-3' style={{ maxWidth: '500px', margin: '20px auto' }}>
                    <h5 className="card-header text-center text-dark">Add User </h5>
                    <div className="card-body">
                        {loading &&
                            <div class="text-center">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        {error && <div className="text-danger text-center h6">{error.message}</div>}
                        {success && <div className="text-primary text-center h6">{adminSignupInfo.message}</div>}

                        <div className="form-group">
                            {/* <label className="card-title bg-info w-100 text-white" for="name">Name:</label> */}
                            <input type="text" className="form-control border-top-0 border-left-0 border-right-0" id="name" placeholder="Enter Name" name="name" onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            {/* <label className="card-title bg-info w-100 text-white" for="email">email:</label> */}
                            <input type="email" className="form-control border-top-0 border-left-0 border-right-0" id="email" placeholder="Enter Email" name="Email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            {/* <label className="card-title bg-info w-100 text-white" for="pwd">Password:</label> */}
                            <input type="password" className="form-control border-top-0 border-left-0 border-right-0" id="pwd" placeholder="Enter password" name="pswd" onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className="form-group" >
                            <BootstrapSwitchButton
                                checked={visible}
                                onlabel='Super Admin'
                                onstyle='success'
                                offlabel='Sub Admin'
                                offstyle='info'
                                style='w-100'
                               onChange={() => setVisible(!visible)}
                            />
                        </div>



                        <button type="submit" style={{ width: '100%' }} className="btn btn-success shadow rounded-lg font-weight-bold">Submit</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default SignupScreen


