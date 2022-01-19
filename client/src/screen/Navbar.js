import React from 'react';
import { NavLink } from 'react-router-dom'
import ProfileImg from './assets/profile.png'

const Navbar = () => {
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
                      <h5 className="card-title text-center">User name</h5>
                      <div className="card-body text-center">
                        {/* <NavLink to='/profile' className=" btn btn-info shadow rounded mr-2"> <i className="fas fa-user"></i></NavLink> */}
                        <button onClick={() => { if (window.confirm('Are you sure you want to log out?')) { }; }} className=" btn btn-danger shadow rounded"> <i className="fas fa-sign-out-alt"></i></button>
                        <NavLink to="/profile" exact={true} activeClassName='text-success' className=" btn btn-success shadow rounded mx-2"> <i className="fas fa-user-alt"></i></NavLink>
                      </div>
                    </div>
                  </div>
                </span>
                <span className="text-dark mx-2 h6">User Name</span>
              </div>
            </li>
            <li className="nav-item active my-1">
              <button onClick={() => { if (window.confirm('Request a Premium Account?')) { }; }} className=" btn btn-success shadow rounded mx-2"> <i className="fas fa-crown"></i></button>
            </li>
          </ul>
        }
      </div>
    </nav>

  )
}

export default Navbar