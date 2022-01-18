import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import ActionButton from './ActionButton';
const DetailScreen = (props) => {
    let serNo = 0

    return (
        <>
            <Navbar />
            <div className="m-4">
                <div className='cart shadow bg-white rounded p-3 '>
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

                    {/* table */}
                    {/* {itemList.length === 0 ? <h5 className="text-muted text-center">Item Not Found!</h5> : */}
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

                {/* upload file model */}

                {/* <div className="modal fade" id="uploadFile" tabindex="-1" role="dialog" aria-labelledby="uploadFile" aria-hidden="true">
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
                                        <select className="form-control border-top-0 border-left-0 border-right-0 rounded" id="exampleFormControlSelect1" required>
                                            <option value="" disabled selected>Select File Type</option>
                                            <option value="">JSON</option>
                                            <option value="">Excel</option>
                                        </select>
                                    </div>

                                    <div className="form-group custom-file mb-3">
                                        <input type="file" className="custom-file-input" id="customFile" accept=".pdf" />
                                        <label className="form-control rounded border-top-0 border-left-0 border-right-0 custom-file-label" for="customFile">Choose file</label>
                                    </div>

                                    <button type="button" className="btn btn-primary btn-sm w-100">
                                        <i className="fas fa-file"> Uplaod File </i>
                                    </button>

                                </form>
                            </div>

                        </div>
                    </div>
                </div> */}
            </div>

            <ActionButton />
        </>
    )
}

export default DetailScreen