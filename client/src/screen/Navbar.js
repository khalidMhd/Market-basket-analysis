import React from 'react';
import { Link } from 'react-router-dom'
import ProfileImg from './assets/profile.png'

const Navbar = () => {
  return (

    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm ">
        <Link to="/" className="navbar-brand mb-0 h1 mx-2">Expert System</Link>
        <button className="navbar-toggler bg-success text-info" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon text-info"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/contact" className="nav-link mb-0 h6 text-muted mx-2" >Get Support <span className="sr-only">(current)</span></Link>
            </li>
          </ul>

          {true &&
            <>
              <div className='chip'>
                <span className="dropdown">
                  <img src={ProfileImg} style={{ cursor: 'pointer' }} className="rounded-circle dropdown-toggle navImg" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <div style={{ width: '200px', margin: 'auto' }}>
                      <img src={ProfileImg} className="card-img-top rounded-circle" style={{ width: '100px', display: "block", margin: 'auto' }} alt="Card image cap" />
                      <h5 className="card-title text-center">User name</h5>
                      <div className="card-body text-center">
                        {/* <Link to='/profile' className=" btn btn-info shadow rounded mr-2"> <i className="fas fa-user"></i></Link> */}
                        <button onClick={() => { if (window.confirm('Are you sure you want to log out?')) { }; }} className=" btn btn-danger shadow rounded"> <i className="fas fa-sign-out-alt"></i></button>
                        <Link to="/profile" className=" btn btn-success shadow rounded mx-2"> <i className="fas fa-user-alt"></i></Link>
                      </div>
                    </div>
                  </div>
                </span>
                <span className="text-dark mx-2 h6">User Name</span>
              </div>

              <button onClick={() => { if (window.confirm('Request a Premium Account?')) { }; }} className=" btn btn-success shadow rounded mx-2"> <i className="fas fa-crown"></i></button>

            </>
          }

        </div>
      </nav>

      <div className="modal fade" id="uploadFile" tabindex="-1" role="dialog" aria-labelledby="uploadFile" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <div className='modal-title w-100 '>
                <p className="w-100 fas fa-plus-circle fa-3x mt-1 mr-1 text-info " ></p> <br />
                <h5 className="text-muted">Upload File</h5>
              </div>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form>

                <div className="form-group">
                  <select className="form-control border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlSelect1" required>
                    <option value="" disabled selected>Select File Type</option>
                    <option value="">JSON</option>
                    <option value="">Excel</option>
                  </select>
                </div>

                <div className="form-group custom-file mb-3">
                  <input type="file" className="custom-file-input" id="customFile" accept=".pdf" />
                  <label className="form-control rounded border-top-0 border-left-0 border-right-0 custom-file-label bg-light rounded" for="customFile">Choose file</label>
                </div>

                <button type="button" className="btn btn-primary btn-sm w-100">
                  <i className="fas fa-file"> Uplaod File </i>
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>

    </>

  )
}

export default Navbar