import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../action/auth'
import Logo from '../assets/Logo.png'
import '../style/Login.css'
import $ from 'jquery'
import 'jquery-validation'
import { adminSigninAction } from '../../action/admin/auth'

const SigninScreen = (props) => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const adminSignin = useSelector(state => state.adminSignin);
	const { loading, success, adminInfo, error } = adminSignin;

	useEffect(() => {
		if (adminInfo) {
			window.location.href = "/admin/dashboard"
		}
	}, [adminInfo])

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(adminSigninAction(email, password));
	}

	return (

		<div className='login'>

			<div className="cover"></div>
			<div style={{ maxWidth: "430px", margin: "100px auto 50px" }}>
				<div className="text-center mb-5">
					<span className="auth-head-icon"><i className="fa fa-user"></i></span>
				</div>
				<div className="ibox login-box">
					<form onSubmit={submitHandler} className="ibox-body p-3" id="login-form">
						<h4 className="font-strong text-center py-4 ">LOG IN</h4>

						{loading &&
							<div class="text-center">
								<div class="spinner-border text-primary" role="status">
									<span class="sr-only">Loading...</span>
								</div>
							</div>
						}
						{success && <div className="text-primary text-center h6">{adminInfo.message}</div>}
						{error && <div className="text-danger text-center h6">{error.message}</div>}

						<div className="form-group mb-4">
							<input className="form-control form-control-line" onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="email" placeholder="Email" />
						</div>
						<div className="form-group mb-4">
							<input className="form-control form-control-line" onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password" />
						</div>
						{/* <div className="flexbox mb-5">
							<label className="checkbox checkbox-primary">
								<input type="checkbox" name="remember" id="remember" />
								<span className="input-span"></span> Remember
							</label>
							<a className="color-inherit" >Forgot password?</a>
						</div> */}
						<div className="text-center pb-4">
							<button type='submit' className="btn btn-success btn-rounded btn-block">LOGIN</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SigninScreen


