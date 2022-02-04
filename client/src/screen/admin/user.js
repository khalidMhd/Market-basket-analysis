import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useDispatch, useSelector } from 'react-redux';
import { confirmActivateUserAction, confirmDeactivateUserAction, userListAction } from '../../action/admin/user';
import { confirmBasicAction, confirmPremiumAction } from '../../action/admin/premium';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUserScreen = (props) => {
    const dispatch = useDispatch()
    let allSerNo = 0
    let premiumSerNo = 0
    let basicSerNo = 0
    let deactivateSerNo = 0

    const userListRed = useSelector(state => state.userListRed)
    const { loading, error, userList } = userListRed

    const confirmPremiumRed = useSelector(state => state.confirmPremiumRed)
    const { premiumLoading, premiumError, premiumSuccess, confirmPremium } = confirmPremiumRed

    const confirmBasicRed = useSelector(state => state.confirmBasicRed)
    const { basicLoading, basicError, basicSuccess, confirmBasic } = confirmBasicRed

    const confirmActivateUserRed = useSelector(state => state.confirmActivateUserRed)
    const { activateLoading, activateError, activateSuccess, conformActivateUser } = confirmActivateUserRed

    const confirmDeActivateUserRed = useSelector(state => state.confirmDeActivateUserRed)
    const { deActivateLoading, deActivateError, deActivateSuccess, conformDeActivateUser } = confirmDeActivateUserRed
    
    const adminSignin = useSelector(state => state.adminSignin);
	const {adminInfo } = adminSignin;

    useEffect(() => {
        adminInfo ? props.history.push('/admin/user') : props.history.push('/admin/signin')
    },[adminInfo])

    if (premiumSuccess) {
        toast.success(confirmPremium.message);
        window.location.reload()
    }

    if (premiumError) {
        toast.error(premiumError.message);
    }

    if (basicSuccess) {
        toast.success(confirmBasic.message);
        window.location.reload()
    }

    if (basicError) {
        toast.error(basicError.message);
    }

    if (activateSuccess) {
        toast.success(conformActivateUser.message);
        window.location.reload()
    }

    if (activateError) {
        toast.error(activateError.message);
    }

    if (deActivateSuccess) {
        toast.success(conformDeActivateUser.message);
        window.location.reload()
    }

    if (deActivateError) {
        toast.error(deActivateError.message);
    }

    useEffect(() => {
        dispatch(userListAction())
    }, [])

    const filterPremium = userList && userList.filter(user => {
        return user?.isPremium === true
    })

    const filterBasic = userList && userList.filter(user => {
        return user?.isPremium === false
    })

    const filterDelete = userList && userList.filter(user => {
        return user?.accStatus === false
    })


    const deactivateHandler = (id) => {
        dispatch(confirmDeactivateUserAction(id))
    }

    const activateHandler = (id) => {
        dispatch(confirmActivateUserAction(id))
    }

    const premiumHandler = (id) => {
        dispatch(confirmPremiumAction(id))
    }
    const basicHandler = (id) => {
        dispatch(confirmBasicAction(id))
    }


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
                                        <a className="nav-link active" id="all-tab-md" data-toggle="tab" href="#all-md" role="tab" aria-controls="all-md" aria-selected="true">All Users <span className="badge badge-primary"> {userList?.length}</span></a>
                                    </li>

                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link" id="premium-tab-md" data-toggle="tab" href="#premium-md" role="tab" aria-controls="premium-md" aria-selected="false">Premium Users <span className="badge badge-primary"> {filterPremium?.length}</span></a>
                                    </li>

                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link" id="basic-tab-md" data-toggle="tab" href="#basic-md" role="tab" aria-controls="basic-md" aria-selected="false">Basic Users <span className="badge badge-primary"> {filterBasic?.length}</span></a>
                                    </li>

                                    <li className="nav-item waves-effect waves-light">
                                        <a className="nav-link" id="deactivate-tab-md" data-toggle="tab" href="#deactivate-md" role="tab" aria-controls="deactivate-md" aria-selected="false">Deactivate Users <span className="badge badge-primary"> {filterDelete?.length}</span></a>
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
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="myTable">
                                                    {userList && userList.map(data =>
                                                        <tr>
                                                            <th scope="row">{allSerNo += 1}</th>
                                                            <td>{data?.name}</td>
                                                            <td>{data?.email}</td>
                                                            {data?.isPremium ?
                                                                <td className='text-success'>Premium</td>
                                                                : <td className='text-primary'>Basic</td>
                                                            }
                                                            <td >
                                                                {data?.isPremium ?
                                                                    <span onClick={() => { if (window.confirm('Change user account to Basic?')) { basicHandler(data._id) } }}>

                                                                        {data?.isPremium ?
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
                                                                    :
                                                                    <span onClick={() => { if (window.confirm('Change user account to Premium?')) { premiumHandler(data._id) } }}>

                                                                        {data?.isPremium ?
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

                                                                }

                                                                {data.accStatus ?
                                                                    <span className='fa fa-user-minus mx-2 fa-lg text-danger' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to deactivate this user?')) { deactivateHandler(data?._id) } }}></span>
                                                                    :
                                                                    <span className='fa fa-user-check mx-2 fa-lg text-success' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to activate this user?')) { activateHandler(data?._id) } }}></span>
                                                                }

                                                            </td>
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

                                    <div className="tab-pane fade show" id="premium-md" role="tabpanel" aria-labelledby="premium-tab-md">
                                        <div className='table-responsive '>
                                            <table className="table table-bordered table table-hover">
                                                <thead>
                                                    <tr className='table-active'>
                                                        <th scope="col">S No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="myTable">
                                                    {userList && filterPremium.map(data =>
                                                        <tr>
                                                            <th scope="row">{allSerNo += 1}</th>
                                                            <td>{data?.name}</td>
                                                            <td>{data?.email}</td>
                                                            {data?.isPremium ?
                                                                <td className='text-success'>Premium</td>
                                                                : <td className='text-primary'>Basic</td>
                                                            }
                                                            <td >
                                                                {data?.isPremium ?
                                                                    <span onClick={() => { if (window.confirm('Change user account to Basic?')) { basicHandler(data._id) } }}>

                                                                        {data?.isPremium ?
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
                                                                    :
                                                                    <span onClick={() => { if (window.confirm('Change user account to Premium?')) { premiumHandler(data._id) } }}>

                                                                        {data?.isPremium ?
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

                                                                }

                                                                {data.accStatus ?
                                                                    <span className='fa fa-user-minus mx-2 fa-lg text-danger' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to deactivate this user?')) { deactivateHandler(data?._id) } }}></span>
                                                                    :
                                                                    <span className='fa fa-user-check mx-2 fa-lg text-success' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to activate this user?')) { activateHandler(data?._id) } }}></span>
                                                                }                                                            </td>
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

                                    <div className="tab-pane fade show" id="basic-md" role="tabpanel" aria-labelledby="basic-tab-md">
                                        <div className='table-responsive '>
                                            <table className="table table-bordered table table-hover">
                                                <thead>
                                                    <tr className='table-active'>
                                                        <th scope="col">S No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="myTable">
                                                    {userList && filterBasic.map(data =>
                                                        <tr>
                                                            <th scope="row">{allSerNo += 1}</th>
                                                            <td>{data?.name}</td>
                                                            <td>{data?.email}</td>
                                                            {data?.isPremium ?
                                                                <td className='text-success'>Premium</td>
                                                                : <td className='text-primary'>Basic</td>
                                                            }
                                                            <td >
                                                                {data?.isPremium ?
                                                                    <span onClick={() => { if (window.confirm('Change user account to Basic?')) { basicHandler(data._id) } }}>

                                                                        {data?.isPremium ?
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
                                                                    :
                                                                    <span onClick={() => { if (window.confirm('Change user account to Premium?')) { premiumHandler(data._id) } }}>

                                                                        {data?.isPremium ?
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

                                                                }

                                                                {data.accStatus ?
                                                                    <span className='fa fa-user-minus mx-2 fa-lg text-danger' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to deactivate this user?')) { deactivateHandler(data?._id) } }}></span>
                                                                    :
                                                                    <span className='fa fa-user-check mx-2 fa-lg text-success' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to activate this user?')) { activateHandler(data?._id) } }}></span>
                                                                }                                                            </td>
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

                                    <div className="tab-pane fade show" id="deactivate-md" role="tabpanel" aria-labelledby="deactivate-tab-md">
                                        <div className='table-responsive '>
                                            <table className="table table-bordered table table-hover">
                                                <thead>
                                                    <tr className='table-active'>
                                                        <th scope="col">S No.</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="myTable">
                                                    {userList && filterDelete.map(data =>
                                                        <tr>
                                                            <th scope="row">{allSerNo += 1}</th>
                                                            <td>{data?.name}</td>
                                                            <td>{data?.email}</td>
                                                            {data?.isPremium ? <td className='text-success'>Premium</td>
                                                                : <td className='text-primary'>Basic</td>
                                                            }
                                                            <td >
                                                                <span className='fa fa-user-check mx-2 fa-lg text-success' style={{ cursor: "pointer" }} onClick={() => { if (window.confirm('Are you sure to activate this user?')) { activateHandler(data?._id) } }}></span>
                                                            </td>
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
                                    <ToastContainer />
                                </div>
                            </section>
                        </div>
                    </div>
                }
            </main>
        </div>
    )
}

export default AdminUserScreen