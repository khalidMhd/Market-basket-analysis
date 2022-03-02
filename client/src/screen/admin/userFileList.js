import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import $, { data } from 'jquery'
import { userFileListAction } from '../../action/admin/user';

const UserFileListScreen = (props) => {
    const dispatch = useDispatch()
    let serNo = 0
    const id = props.match.params.id

    const userFileListRed = useSelector(state => state.userFileListRed);
    const { loading, error, userFileList } = userFileListRed

    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    useEffect(() => {
        adminInfo ? props.history.push(`/admin/user/file/${id}`) : props.history.push('/admin/signin')
        dispatch(userFileListAction(id))
    }, [adminInfo])
    

    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

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

                            {/* filter */}
                            <div className='row justify-content-between'>
                                <form className='col-sm-4'>
                                    <div className="form-group">
                                        <input type="text" className="form-control rounded bg-light" id="myInput" placeholder="Search" />
                                    </div>
                                </form>
                            </div>

                            {userFileList && userFileList?.length === 0 && <h5 className='text-center text-danger'>Data not yet!</h5>}
                            {error && <h5 className='text-center text-danger'> {error.message}</h5>}

                            <div className='table-responsive '>
                                <table className="table table-bordered table table-hover">
                                    <thead>
                                        <tr className='table-active'>
                                            <th scope="col">S No.</th>
                                            <th scope="col">File</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Created At</th>
                                        </tr>
                                    </thead>

                                    <tbody id="myTable">
                                        {userFileList && userFileList.map(data =>
                                            <tr>
                                                <th scope="row">{serNo += 1}</th>
                                                <td>
                                                <a href={`http://localhost:5000/${data?.file}`} download={`http://localhost:5000/${data?.file}.xls`}><i class="fa fa-file-download fa-lg"></i></a>

                                                </td>
                                                <td>
                                                    {data.type === 1 ? "Excel": "JSON"}
                                                </td>
                                                <td>{new Date(data?.createdAt).getDate() + '-' + new Date(data?.createdAt).getMonth() + '-' + new Date(data?.createdAt).getFullYear()}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }

            </main>
        </div>
    )
}

export default UserFileListScreen