import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../../../App.css';
import Chart from "react-google-charts";

const PremiumChartScreen = (props) => {
    const dispatch = useDispatch()
    const [chartSelect, setcChartSelect] = useState(1)
    var weeklyTitle = null

    return (
        <> 

            <div className='d-flex justify-content-between'>
                <div className=''>
                    <h3 className='text-center text-muted '>User Analytics</h3>
                </div>

                <div className=" d-flex justify-content-end mt-2">

                    <button className="btn btn-primary mx-1 mb-1" >Weekly</button>
                    <button className="btn btn-success mx-1 mb-1" >Last 30 dayes</button>
                    <button className="btn btn-warning mx-1 mb-1" >Yearly</button>
                </div>
            </div>

            <div>
                <Chart
                    // width={'500px'}
                    // height={'300px'}

                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Date', 'Basic', 'Premium',],
                        ['19-12-2021', 100, 50],
                        ['19-12-2021', 70, 60],
                        ['19-12-2021', 60, 50],
                        ['19-12-2021', 30, 20],
                        ['19-12-2021', 130, 40],
                        ['19-12-2021', 30, 40],
                    ]}
                    options={{
                        // colors: ['#FB7A21'],
                        // backgroundColor: '#2F4F4F',
                        // chart: {
                        //     title: 'Company Performance',
                        //     subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        // },
                        legend: { position: 'none' },
                        // title: "weeklyTitle",
                        titleTextStyle: { color: '#FFF' },
                        // vAxis: { title: 'Percentage', titleTextStyle: { color: '#FFF' }, textStyle: { color: '#FFF' } },
                        // hAxis: { title: 'Month', fontSize: 28, titleTextStyle: { color: '#FFF' }, textStyle: { color: '#FFF' } },
                        seriesType: 'bars',
                        series: { 5: { type: 'line' } },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />

            </div>
        </>
    )

}

export default PremiumChartScreen;