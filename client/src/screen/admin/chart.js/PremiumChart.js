import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../../../App.css';
import Chart from "react-google-charts";

const PremiumChartScreen = (props) => {
    const dispatch = useDispatch()

    const [chartSelect, setChartSelect] = useState(1)

    const userListRed = useSelector(state => state.userListRed)
    const { userList } = userListRed

    const getPremium = userList && userList.filter(data => {
        return data?.isPremium === true
    })

    const getBasic = userList && userList.filter(data => {
        return data?.isPremium === false
    })

    var weeklyTitle = null

    const getWeekly = () => {

        weeklyTitle = "Weekly Data"
        var now = new Date();
        var lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 6)
        var data = []
        data.push(['Date', 'Premium', 'Basic'])
        var index = 0;

        for (lastDate; lastDate <= now; lastDate.setDate(lastDate.getDate() + 1)) {

            var PremiumAtDate = getPremium && getPremium.filter(function (data) {
                return lastDate.toLocaleDateString() === new Date(data?.createdAt).toLocaleDateString();
            })
            var basicAtDate = getBasic && getBasic.filter(function (data) {
                return lastDate.toLocaleDateString() === new Date(data?.createdAt).toLocaleDateString();
            })

            data.push([lastDate.toLocaleDateString(), PremiumAtDate?.length, basicAtDate?.length])
            index++
        }

        return data;
    }

    const getMonthly = () => {
        weeklyTitle = "Monthly Data"
        var now = new Date();
        var lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 30)
        var data = []
        data.push(['Date', 'Premium', 'Basic'])
        var index = 0;

        for (lastDate; lastDate <= now; lastDate.setDate(lastDate.getDate() + 3)) {
            var minDate = new Date(lastDate)
            var maxDate = new Date(lastDate)
            maxDate.setDate(maxDate.getDate() + 3)

            var PremiumAtDate = getPremium && getPremium.filter(function (data) {
                return new Date(data?.createdAt).getTime() >= minDate.getTime() &&
                    new Date(data?.createdAt).getTime() <= maxDate.getTime();
            })
            var basicAtDate = getBasic && getBasic.filter(function (data) {
                return new Date(data?.createdAt).getTime() >= minDate.getTime() &&
                    new Date(data?.createdAt).getTime() <= maxDate.getTime();
            })

            var dateLabel = lastDate.getDate() + "/" + (lastDate.getUTCMonth() + 1)
            data.push([dateLabel, PremiumAtDate?.length, basicAtDate?.length])
            index++
        }

        return data;
    }
    const getYearly = () => {
        weeklyTitle = "Yearly Data"
        var now = new Date();
        var lastDate = new Date();
        lastDate.setMonth(lastDate.getMonth() - 11)
        var data = []
        data.push(['Date', 'Premium', 'Basic'])
        var index = 0;

        for (lastDate; lastDate <= now; lastDate.setMonth(lastDate.getMonth() + 1)) {

            var PremiumAtDate = getPremium && getPremium.filter(function (data) {
                return lastDate.getMonth() === new Date(data?.createdAt).getMonth() &&
                    lastDate.getFullYear() === new Date(data?.createdAt).getFullYear()
            })

            var basicAtDate = getBasic && getBasic.filter(function (data) {
                return lastDate.getMonth() === new Date(data?.createdAt).getMonth() &&
                    lastDate.getFullYear() === new Date(data?.createdAt).getFullYear()
            })

            var dateLabel = (lastDate.getUTCMonth() + 1) + "/" + lastDate.toLocaleDateString('en', { year: '2-digit' })
            data.push([dateLabel, PremiumAtDate?.length, basicAtDate?.length])
            index++
        }

        return data;
    }

    function chartData() {
        if (chartSelect === 1) {
            return getWeekly()
        }
        if (chartSelect === 2) {
            return getMonthly()
        }
        if (chartSelect === 3) {
            return getYearly()
        }
        else {
            return getWeekly()
        }

    };

    return (
        <>

            <div className='row justify-content-between mx-2' >
                <div className=''>
                    <h3 className='text-center text-muted '>User Analytics</h3>
                </div>

                <div className=" d-flex justify-content-end mt-2">
                    <button className="btn btn-primary mx-1 mb-1" onClick={() => setChartSelect(1)} >Weekly</button>
                    <button className="btn btn-success mx-1 mb-1" onClick={() => setChartSelect(2)}>Last 30 days</button>
                    <button className="btn btn-warning mx-1 mb-1" onClick={() => setChartSelect(3)}>Yearly</button>
                </div>
            </div>

            {
                userList &&
                <div >
                    <Chart

                        chartType="ComboChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData()}
                        options={{
                            title: weeklyTitle,
                            legend: { position: 'none' },
                            vAxis: { title: 'Percentage', fontSize: 28, },
                            hAxis: { title: 'Month', fontSize: 28, },
                            seriesType: 'bars',
                            series: { 7: { type: 'line' } },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />

                </div>
            }
        </>
    )

}

export default PremiumChartScreen;