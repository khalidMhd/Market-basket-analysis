import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../../App.css';
import Navbar from "./Navbar";
import '../style/dashboard.css'
import PremiumChartScreen from "./chart.js/PremiumChart";

const DashboardScreen = (props) => {
    const dispatch = useDispatch()


    return (
        <div className='containerMain'>

            <Navbar />
            <main >

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
                                        <text x="18" y="20.35" className="percentage"> 1%</text>
                                    </svg>
                                </div>
                                <div className="svg-text">
                                    <h3 style={{ color: "#ff9f00" }}> 1%</h3>
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
                                        <text x="18" y="20.35" className="percentage"> 1%</text>
                                    </svg>
                                </div>
                                <div className="svg-text">
                                    <h3 style={{ color: "#4CC790" }}> 1%</h3>
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
                                        <text x="18" y="20.35" className="percentage"> 1%</text>
                                    </svg>
                                </div>
                                <div className="svg-text">
                                    <h3 style={{ color: '#3c9ee5' }}>1%</h3>
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
                                        <text x="18" y="20.35" className="percentage">1%</text>
                                    </svg>
                                </div>
                                <div className="svg-text">
                                    <h3 style={{ color: '#F75A5F' }}>1%</h3>
                                    <p className=' text-muted'>Pending User</p>
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
            </main>
        </div>
    )

}

export default DashboardScreen;