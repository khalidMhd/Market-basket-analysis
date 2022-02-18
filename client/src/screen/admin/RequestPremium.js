import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useDispatch, useSelector } from 'react-redux';
import { confirmPremiumAction, premiumListAction } from '../../action/admin/premium';
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

    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    if (premiumSuccess) {
        toast.success(confirmPremium.message);
        window.location.reload()

    }
    if (saveError) {
        toast.error(saveError.message);
    }

    useEffect(() => {
        adminInfo ? props.history.push('/admin/request-premium') : props.history.push('/admin/signin')
        dispatch(premiumListAction())

    }, [adminInfo])


    const premiumHandler = (id) => {
        dispatch(confirmPremiumAction(id))
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
                                                <td>{data?.user?.name}</td>
                                                <td>{data?.user?.email}</td>
                                                <td>{new Date(data?.createdAt).getDate() + '-' + new Date(data?.createdAt).getMonth() + '-' + new Date(data?.createdAt).getFullYear()}</td>
                                                <td onClick={() => { if (window.confirm('Change user account to premium?')) { premiumHandler(data?.user?._id) } }}>
                                                    {data?.user?.isPremium ?
                                                        <BootstrapSwitchButton
                                                            checked={true}
                                                            disabled={true}
                                                            onlabel='Premium User'
                                                            onstyle='success'
                                                            offlabel='Basic User'
                                                            offstyle='danger'
                                                            style='w-100'
                                                        />
                                                        :
                                                        <BootstrapSwitchButton
                                                            checked={false}
                                                            disabled={true}
                                                            onlabel='Premium User'
                                                            onstyle='success'
                                                            offlabel='Basic User'
                                                            offstyle='danger'
                                                            style='w-100'
                                                        />
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