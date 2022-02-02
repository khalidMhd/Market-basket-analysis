import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import ProfileImg from './assets/profile.png'
import Cookie from 'js-cookie'
import { premiumRequest } from '../action/premium';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshUser } from '../action/user';

const Navbar = (props) => {
  const dispatch = useDispatch()
  
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo } = userSignin;
  
  const userRefreshRed = useSelector(state => state.userRefreshRed);
  const {userRef } = userRefreshRed;
console.log(userRef);

  const premiumRequestRed = useSelector(state => state.premiumRequestRed);
  const { loading, success, premiumReq, error } = premiumRequestRed;

  const logoutHandler = () => {
    Cookie.remove("userInfo");
    window.location.href = "/signin"
  };

  const premiumHandler = () => {
    // e.preventDefault()
    dispatch(premiumRequest())
  }

  if (success) {
    toast.success(premiumReq.message);
  }
  if (error) {
    toast.error(error.message);
  }

  useEffect(() =>{
    dispatch(refreshUser())
  },[])

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm ">
      <NavLink to="/" exact={true} activeClassName='text-success' className="navbar-brand mb-0 h1 mx-2 ">Expert System</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="fa fa-bars "></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to="/contact" exact={true} activeClassName='text-success' className="nav-link mb-0 h5  mx-2" >Get Support </NavLink>
          </li>
        </ul>

        {true &&
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <div className='chip'>
                <span className="dropdown">
                  <img src={ProfileImg} style={{ cursor: 'pointer' }} className="rounded-circle dropdown-toggle navImg" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <div style={{ width: '200px', margin: 'auto' }}>
                      <img src={ProfileImg} className="card-img-top rounded-circle" style={{ width: '100px', display: "block", margin: 'auto' }} alt="Card image cap" />
                      <h5 className="card-title text-center">{userInfo?.user?.name}</h5>
                      <div className="card-body text-center">
                        {/* <NavLink to='/profile' className=" btn btn-info shadow rounded mr-2"> <i className="fas fa-user"></i></NavLink> */}
                        <button onClick={() => { if (window.confirm('Are you sure you want to log out?')) {logoutHandler() }; }} className=" btn btn-danger shadow rounded"> <i className="fas fa-sign-out-alt"></i></button>
                        <Link to="/profile" exact={true} activeClassName='text-success' className=" btn btn-success shadow rounded mx-2"> <i className="fas fa-user-alt"></i></Link>
                      </div>
                    </div>
                  </div>
                </span>
                <span className="text-dark mx-2 h6"> {userRef?.isPremium === true &&<span className='fas fa-crown text-success'></span>} {userInfo?.user?.name}</span>
              </div>
            </li>
            <li className="nav-item active my-1">
              {userRef?.isPremium === false && <button onClick={() => { if (window.confirm('Request a Premium Account?')) { premiumHandler()} }} className=" btn btn-success shadow rounded mx-2"> <i className="fas fa-crown"></i></button>} 
            </li>
            <ToastContainer />
          </ul> 
        }
      </div>
    </nav>

  )
}

export default Navbar