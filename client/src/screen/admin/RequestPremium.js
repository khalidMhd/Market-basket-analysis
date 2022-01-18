import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';

const RequestPremiumScreen = (props) => {
    let serNo = 0

    return (
        <div className='containerMain'>

            <Navbar />
            <main>
                <div className="m-4">
                    <div className='cart shadow bg-white rounded p-3'>
                        {/* <div>
                    <h5 className="text-muted">Title</h5>
                </div> */}

                        {/* filter */}
                        <div className='row justify-content-between'>
                            <form className='col-sm-4'>
                                <div className="form-group">
                                    <input type="text" className="form-control rounded bg-light" id="myInput" placeholder="Search" />
                                </div>
                            </form>
                            {/* <div className="mr-3">
                                <button type="button" onClick={() => props.history.push('/admin/add-user')} className="btn btn-success btn-sm" data-toggle="modal" data-target="#uploadFile">
                                    <i className="fas fa-user-plus"> Add user </i>
                                </button>
                            </div> */}
                        </div>

                        <div className='table-responsive '>
                            <table className="table table-bordered table table-hover">
                                <thead>
                                    <tr className='table-active'>
                                        <th scope="col">S No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Khalid</td>
                                        <td>KhalidMhd@gmail.com</td>
                                        <td className='text-danger'>Basic</td>
                                        <td>12-9-2020</td>
                                        <td>
                                            <span className="fas fa-edit fa-lg text-success mx-2" data-toggle="modal" data-target="#exampleModal" style={{ cursor: "pointer" }} ></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Noor</td>
                                        <td>NoorJayaz@gmail.com</td>
                                        <td className='text-danger'>Basic</td>
                                        <td>12-9-2020</td>
                                        <td>
                                            <span className="fas fa-edit fa-lg text-success mx-2" data-toggle="modal" data-target="#exampleModal" style={{ cursor: "pointer" }} ></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Hamad</td>
                                        <td>hamad@gmail.com</td>
                                        <td className='text-danger'>Basic</td>
                                        <td>12-12-2020</td>
                                        <td>
                                            <span className="fas fa-edit fa-lg text-success mx-2" data-toggle="modal" data-target="#exampleModal" style={{ cursor: "pointer" }} ></span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RequestPremiumScreen