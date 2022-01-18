import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';

const AdminUserScreen = (props) => {
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
                        <div className='row justify-content-between '>
                            <form className='col-sm-4 ml-2'>
                                <div className="form-group">
                                    <input type="text" className="form-control rounded bg-light" id="myInput" placeholder="Search" />
                                </div>
                            </form>
                            <div className="mr-3">
                                <button type="button" onClick={() => props.history.push('/admin/add-user')} className="btn btn-success btn-sm" data-toggle="modal" data-target="#uploadFile">
                                    <i className="fas fa-user-plus"> Add user </i>
                                </button>
                            </div>
                        </div>

                        <section className="mx-2 pb-3">

                            <ul className="nav nav-tabs md-tabs nav-justified rounded-lg" id="myTabMD" role="tablist">

                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link active" id="all-tab-md" data-toggle="tab" href="#all-md" role="tab" aria-controls="all-md" aria-selected="true">All Users <span className="badge badge-primary"> 3</span></a>
                                </li>

                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link" id="premium-tab-md" data-toggle="tab" href="#premium-md" role="tab" aria-controls="premium-md" aria-selected="false">Premium Account <span className="badge badge-primary"> 2</span></a>
                                </li>

                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link" id="basic-tab-md" data-toggle="tab" href="#basic-md" role="tab" aria-controls="basic-md" aria-selected="false">Basic Account <span className="badge badge-primary"> 2</span></a>
                                </li>
                            </ul>

                            <div className="tab-content card pt-2" id="myTabContentMD">

                                <div className="tab-pane fade show active" id="all-md" role="tabpanel" aria-labelledby="all-tab-md">
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
                                                    <td className='text-success'>Premium</td>
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
                                        <div className="d-flex justify-content-end">
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item"><button className="page-link">Previous</button></li>
                                                <li className="page-item px-3 text-muted">3 of 100</li>
                                                <li className="page-item"><button className="page-link">Next</button></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div className="tab-pane fade show" id="premium-md" role="tabpanel" aria-labelledby="premium-tab-md">
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
                                                    <td className='text-success'>Premium</td>
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
                                        <div className="d-flex justify-content-end">
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item"><button className="page-link">Previous</button></li>
                                                <li className="page-item px-3 text-muted">3 of 100</li>
                                                <li className="page-item"><button className="page-link">Next</button></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div className="tab-pane fade show" id="basic-md" role="tabpanel" aria-labelledby="basic-tab-md">
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
                                                    <td className='text-success'>Premium</td>
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

                                            </tbody>

                                        </table>
                                        <div className="d-flex justify-content-end">
                                            <ul className="pagination pagination-sm">
                                                <li className="page-item"><button className="page-link">Previous</button></li>
                                                <li className="page-item px-3 text-muted">3 of 100</li>
                                                <li className="page-item"><button className="page-link">Next</button></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminUserScreen