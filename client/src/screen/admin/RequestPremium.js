import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useDispatch, useSelector } from 'react-redux';
import { confirmPremiumAction, confirmReadAction, premiumListAction } from '../../action/admin/premium';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $, { data } from 'jquery'

const RequestPremiumScreen = (props) => {
    const dispatch = useDispatch()
    let serNo = 0

    const premiumListRed = useSelector(state => state.premiumListRed);
    const { loading, error, premiumList } = premiumListRed

    const confirmPremiumRed = useSelector(state => state.confirmPremiumRed);
    const { error: saveError, premiumSuccess, confirmPremium } = confirmPremiumRed

    const confirmReadRed = useSelector(state => state.confirmReadRed);
    const { readError, readSuccess, confirmRead } = confirmReadRed

    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    if (premiumSuccess) {
        toast.success(confirmPremium.message);
        window.location.reload()
    }
    if (saveError) {
        toast.error(saveError.message);
    }

    if (readSuccess) {
        toast.success(confirmRead.message);
        window.location.reload()
    }
    if (readError) {
        toast.error(readError.message);
    }

    useEffect(() => {
        adminInfo ? props.history.push('/admin/request-premium') : props.history.push('/admin/signin')
        dispatch(premiumListAction())

    }, [adminInfo])


    const premiumHandler = (id) => {
        dispatch(confirmPremiumAction(id))
    }

    const readHandler = (id) => {
        dispatch(confirmReadAction(id))
    }

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

            <Navbar/>
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
                            {premiumList && premiumList?.length === 0 && <h5 className='text-center text-danger'>Premium request not yet!</h5>}
                            {error && <h5 className='text-center text-danger'> {error.message}</h5>}

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
                                        {premiumList && premiumList.map(data =>
                                            <tr>
                                                <th scope="row">{serNo += 1}</th>
                                                <td>
                                                    {data?.user?.name}
                                                    {data.isRead === false && <span class="badge badge-info">New </span>}
                                                </td>
                                                <td>{data?.user?.email}</td>
                                                <td>{new Date(data?.createdAt).getDate() + '-' + new Date(data?.createdAt).getMonth() + '-' + new Date(data?.createdAt).getFullYear()}</td>
                                                <td >
                                                    <span onClick={() => { if (window.confirm('Change user account to premium?')) { premiumHandler(data?.user?._id) } }}>
                                                        {data?.user?.isPremium ?
                                                            <BootstrapSwitchButton
                                                                checked={true}
                                                                disabled={true}
                                                                onlabel='Premium User'
                                                                onstyle='success'
                                                                offlabel='Basic User'
                                                                offstyle='danger'
                                                                style='w-50'
                                                            />
                                                            :
                                                            <BootstrapSwitchButton
                                                                checked={false}
                                                                disabled={true}
                                                                onlabel='Premium User'
                                                                onstyle='success'
                                                                offlabel='Basic User'
                                                                offstyle='danger'
                                                                style='w-50'
                                                            />
                                                        }
                                                    </span>
                                                    {data?.isRead === false &&
                                                        <span className='fa fa-user-check mx-2 fa-lg text-success' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Mark as read?')) { readHandler(data?._id) } }}></span>
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                }

            </main>
        </div>
    )
}

export default RequestPremiumScreen