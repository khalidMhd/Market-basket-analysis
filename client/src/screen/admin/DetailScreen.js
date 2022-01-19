import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';

const AdminDetailScreen = (props) => {
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
                            <div className="mr-3">
                                <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#uploadFile">
                                    <i className="fas fa-download"> Export </i>
                                </button>
                            </div>
                        </div>

                        <div className='table-responsive '>
                            <table className="table table-bordered table table-hover">
                                <thead>
                                    <tr className='table-active'>
                                        <th scope="col">S No.</th>
                                        <th scope="col">Association Items</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Bread, Milk</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Bread, Milk, Eggs</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Coke, Milk, Beer</td>
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
            </main>
        </div>
    )
}

export default AdminDetailScreen