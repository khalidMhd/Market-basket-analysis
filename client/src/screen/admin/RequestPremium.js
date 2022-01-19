import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import '../../App.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const RequestPremiumScreen = (props) => {
    let serNo = 0

    const [premium, setPremium] = useState(false)

    const premiumHandler = () => {
        setPremium(!premium)
    }

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
                                        <th scope="col">Created At</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Khalid</td>
                                        <td>KhalidMhd@gmail.com</td>
                                        <td>12-9-2020</td>
                                        <td onClick={() => { if (window.confirm('Change user account to premium?')) { premiumHandler() } }}>
                                            {premium ?
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
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Noor</td>
                                        <td>NoorJayaz@gmail.com</td>
                                        <td>12-9-2020</td>
                                        <td onClick={() => { if (window.confirm('Change user account to premium?')) { premiumHandler() } }}>
                                            {premium ?
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
                                    <tr>
                                        <th scope="row">{serNo += 1}</th>
                                        <td>Hamad</td>
                                        <td>hamad@gmail.com</td>
                                        <td>12-12-2020</td>
                                        <td onClick={() => { if (window.confirm('Change user account to premium?')) { premiumHandler() } }}>
                                            {premium ?
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