import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '../../../App.css';
import Chart from "react-google-charts";

const FrequentChartScreen = (props) => {
    const dispatch = useDispatch()

    const getProductAssociation = () => {
        var data = []
        data.push(['Item', "Frequency"])

        props?.frequentItemsets && props?.frequentItemsets.map(item =>
            data.push([item?.items.toString(), item?.items?.length])
        )
        return data
    }

    return (
        <>
            <Chart
                // width={'500px'}
                height={'300px'}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={
                    getProductAssociation()
                }
                options={{
                    // colors: ['#FB7A21'],
                    // backgroundColor: '#2F4F4F',
                    chart: {
                        title: 'Frequent Items',
                        subtitle: 'Frequent Items and Frequency',
                    },
                    legend: { position: 'none' },
                    title: "Maximium Frequent Items",
                    titleTextStyle: { color: '#3366CC' },
                    vAxis: { title: 'Frequency', },
                    hAxis: { title: 'Frequent Items', fontSize: 28, },
                    seriesType: 'bars',
                    series: { 5: { type: 'line' } },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </>
    )

}

export default FrequentChartScreen;