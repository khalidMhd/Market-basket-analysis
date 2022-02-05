import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../../App.css';
import Navbar from "./Navbar";
import '../style/dashboard.css'
import PremiumChartScreen from "./chart.js/PremiumChart";
import { userListAction } from "../../action/admin/user";
import { messageListAction } from "../../action/admin/message";
import { premiumListAction } from "../../action/admin/premium";

const DashboardScreen = (props) => {
    const dispatch = useDispatch()

    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    const userListRed = useSelector(state => state.userListRed)
    const { loading, error, userList } = userListRed

    const messageListRed = useSelector(state => state.messageListRed);
    const { messageList } = messageListRed;

    const premiumListRed = useSelector(state => state.premiumListRed);
    const { premiumList } = premiumListRed

    useEffect(() => {
        adminInfo ? props.history.push('/admin/dashboard') : props.history.push('/admin/signin')
        dispatch(userListAction())
        dispatch(messageListAction())
        dispatch(premiumListAction())

    }, [adminInfo])

    const filterPremium = userList && userList.filter(user => {
        return user?.isPremium === true
    })

    return (
        <div className='containerMain'>

            <Navbar />
            <main >
                {loading ?
                    <div class=" d-flex justify-content-center align-items-center h-100">
                        <div class="spinner-border text-primary " style={{ width: "50px", height: "50px" }} role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div> :

                    < div className=" m-4">

                        <div className="row d-flex ">

                            <div className="col-sm mt-2">
                                <div className="d-flex justify-content-between card shadow bg-white rounded single-chart" style={{ borderBottomColor: '#ff9f00', }}>
                                    <div>
                                        <svg viewBox="0 0 36 36" className="circular-chart orange">
                                            <path className="circle-bg"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path className="circle"
                                                strokeDasharray="30, 100"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className="percentage"> {`${filterPremium?.length || 0}% `}</text>
                                        </svg>
                                    </div>
                                    <div className="svg-text">
                                        <h3 style={{ color: "#ff9f00" }}> {filterPremium?.length || 0}</h3>
                                        <p className=' text-muted'>Premium Users</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm mt-2">
                                <div className="d-flex justify-content-between card shadow bg-white rounded single-chart" style={{ borderBottomColor: '#4CC790', }}>
                                    <div>
                                        <svg viewBox="0 0 36 36" className="circular-chart green">
                                            <path className="circle-bg"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path className="circle"
                                                strokeDasharray="30, 100"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className="percentage"> {`${userList?.length || 0}%`}</text>
                                        </svg>
                                    </div>
                                    <div className="svg-text">
                                        <h3 style={{ color: "#4CC790" }}>{userList?.length || 0}</h3>
                                        <p className=' text-muted'>Total Users</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm mt-2">
                                <div className="d-flex justify-content-between card shadow bg-white rounded single-chart " style={{ borderBottomColor: '#3c9ee5' }}>
                                    <div>
                                        <svg viewBox="0 0 36 36" className="circular-chart blue">
                                            <path className="circle-bg"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path className="circle"
                                                strokeDasharray="30, 100"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className="percentage">{`${messageList?.length || 0}%`}</text>
                                        </svg>
                                    </div>
                                    <div className="svg-text">
                                        <h3 style={{ color: '#3c9ee5' }}>{messageList?.length || 0}</h3>
                                        <p className=' text-muted'>Total Messages</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm mt-2">
                                <div className="d-flex justify-content-between card shadow bg-white rounded single-chart" style={{ borderBottomColor: '#F75A5F', }}>
                                    <div>
                                        <svg viewBox="0 0 36 36" className="circular-chart red">
                                            <path className="circle-bg"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path className="circle"
                                                strokeDasharray="30, 100"
                                                d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className="percentage">{`${premiumList?.length || 0}%`}</text>
                                        </svg>
                                    </div>
                                    <div className="svg-text">
                                        <h3 style={{ color: '#F75A5F' }}>{premiumList?.length || 0}</h3>
                                        <p className=' text-muted'>Premium Requests</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row mt-2">
                            <div className="col-sm">
                                <div className="shadow bg-white rounded p-2">
                                    <PremiumChartScreen />
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </main>
        </div>
    )

}

export default DashboardScreen;