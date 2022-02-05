import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { messageListAction } from '../../action/admin/message';

const AdminMessageScreen = (props) => {
    const dispatch = useDispatch()
    let serNo = 0

    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    const messageListRed = useSelector(state => state.messageListRed);
    const { loading, error, messageList } = messageListRed;

    useEffect(() => {
        adminInfo ? props.history.push('/admin/message') : props.history.push('/admin/signin')
        dispatch(messageListAction())
    }, [adminInfo])

    return (
        <div className='containerMain'>
            <Navbar />
            <main>
                {loading ?
                    <div class=" d-flex justify-content-center align-items-center h-100">
                        <div class="spinner-border text-primary " style={{ width: "50px", height: "50px" }} role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div> :
                    <div className="m-4">
                        <div className='cart shadow bg-white rounded p-3'>
                            {/* <div>
                    <h5 className="text-muted">Title</h5>
                </div> */}

                            <div className='row justify-content-between'>
                                <form className='col-sm-4'>
                                    <div className="form-group">
                                        <input type="text" className="form-control rounded bg-light" id="myInput" placeholder="Search" />
                                    </div>
                                </form>
                            </div>
                            <div className='table-responsive '>
                                <table className="table table-bordered table table-hover">
                                    <thead>
                                        <tr className='table-active'>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        {messageList && messageList.map(data =>
                                            <tr>
                                                <th scope="row">{serNo += 1}</th>
                                                <td>{data?.user?.name}</td>
                                                <td>{data?.user?.email}</td>
                                                <td>{new Date(data?.createdAt).getDate() + '-' + new Date(data?.createdAt).getMonth() + '-' + new Date(data?.createdAt).getFullYear()}</td>
                                                <td>
                                                    {/* <span className="fas fa-download fa-lg text-info" style={{ cursor: "pointer" }}></span> */}
                                                    <a href={`http://localhost:5000/${data?.file}`} download={`http://localhost:5000/${data?.file}`} >download</a>
                                                    <span className="fas fa-eye fa-lg text-success mx-2" data-toggle="modal" data-target={`#exampleModal${data?._id}`} style={{ cursor: "pointer" }} ></span>
                                                </td>
                                                <div class="modal fade" id={`exampleModal${data?._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">User Name</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                {data?.message}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </tr>
                                        )}

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
                }
            </main>
        </div>
    )
}

export default AdminMessageScreen