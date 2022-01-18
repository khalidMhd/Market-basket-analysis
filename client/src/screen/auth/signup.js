import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../action/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from '../admin/Navbar';

const SignupScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const userSignup = useSelector(state => state.userSignup)
    const { loading, success, error } = userSignup

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, type, password));
    }
    useEffect(() => {
        // if (!userInfo) {
        //     props.history.push('/signin');
        // }
        if (success) {
            props.history.push('/registered-user')
            toast("User Created Successfully!");
        }
    }, [userInfo, success])

    return (
        <div className='containerMain'>
            <Navbar />
            <main>
                <form onSubmit={submitHandler} className='card text-dark bg-white shadow rounded-lg mb-3' style={{ maxWidth: '500px', margin: '20px auto' }}>
                    <h5 className="card-header text-center text-dark">User Registeration </h5>
                    <div className="card-body">
                        {loading &&
                            <div class="text-center">
                                <div class="spinner-border text-primary" style={{ width: '50px', height: '50px' }} role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        {error && <div className="text-danger">User Already Exist</div>}
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
                        <button type="submit" style={{ width: '100%' }} className="btn btn-success shadow rounded-lg font-weight-bold">Submit</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default SignupScreen


