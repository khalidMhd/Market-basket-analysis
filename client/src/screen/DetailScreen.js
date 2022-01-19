import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import Chart from "react-google-charts";
import FrequentChartScreen from './admin/chart.js/frequectChart';

const DetailScreen = (props) => {
    let serNo = 0
    const [visibility, setVisibility] = useState(true)

    const frequentItemsets = [
        [
            "Abbasi Salan Masala 200g",
            "MilkPak Full Cream 250ml"
        ],
        [
            "Abbasi Salan Masala 200g",
            "MilkPak Full Cream 250ml",
            "White Sugar"
        ],
        [
            "Lays French Cheese 20Rs",
            "Candy Rs.5",
            "Dall Mongi 500g"
        ],
        [
            "Abbasi Salan Masala 200g",
            "Dall Mongi 500g",
            "White Sugar"
        ],
        [
            "Abbasi Salan Masala 200g",
            "Dall Mongi 500g",
            "MilkPak Full Cream 250ml"
        ],
        [
            "Abbasi Salan Masala 200g",
            "Dall Mongi 500g",
            "MilkPak Full Cream 250ml",
            "White Sugar"
        ],
        [
            "Lays French Cheese 20Rs",
            "Lays Yogurt&Herb 20Rs",
            "White Sugar"
        ],
        [
            "Islamabad Tea 950g",
            "White Sugar"
        ],
        [
            "Butter Puff G HR",
            "MilkPak Full Cream 250ml"
        ],
        [
            "LiptonYellow Label Tea 190g",
            "White Sugar"
        ],
        [
            "Misk POP-UP ",
            "Tapal Green Tea Lemon 30Bags"
        ],
        [
            "Misk POP-UP ",
            "Tapal Green Tea Lemon 30Bags",
            "White Sugar"
        ]
    ]

    return (
        <>
            <Navbar />
            <div className="m-4">
                <div className='cart shadow bg-white rounded p-3 '>
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
                        <div className="mr-3">
                            <button type="button" className="btn btn-success btn-sm" >
                                <i className="fas fa-download"> Export </i>
                            </button>
                        </div>
                    </div>

                    <div>

                        <ul className="nav nav-tabs md-tabs nav-justified rounded-lg mb-3" id="myTab" role="tablist">
                            <li className="nav-item waves-effect waves-light" onClick={() => setVisibility(true)}>
                                <a className="nav-link active" id="table-association-tab-md" data-toggle="tab" href="#table-association-md" role="tab" aria-controls="table-association-md" aria-selected="true">Tablular View <span className="badge badge-primary"> {frequentItemsets?.length} </span></a>
                            </li>

                            <li className="nav-item waves-effect waves-light" onClick={() => setVisibility(false)}>
                                <a className="nav-link" id="graph-association-tab-md" data-toggle="tab" href="#graph-association-md" role="tab" aria-controls="graph-association-md" aria-selected="false">Graphical View</a>
                            </li>
                        </ul>

                        {visibility ?
                            <div className='table-responsive '>
                                <table className="table table-bordered table table-hover">
                                    <thead>
                                        <tr className='table-active'>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Association Items</th>
                                            <th scope="col">Order Frequency</th>
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        {frequentItemsets.map((data, index) =>
                                            <tr>
                                                <th scope="row">{serNo += 1}</th>
                                                <td>{data.join(' -> ')}</td>
                                                <td>{index * 2 + 3}</td>
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
                            :
                            <div>
                                <FrequentChartScreen frequentItemsets={frequentItemsets} />
                            </div>
                        }
                    </div>
                </div>

            </div>

        </>
    )
}


export default DetailScreen