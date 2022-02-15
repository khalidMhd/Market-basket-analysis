import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import Chart from "react-google-charts";
import FrequentChartScreen from './admin/chart.js/frequectChart';
import { useSelector } from 'react-redux';

const DetailScreen = (props) => {
    let serNo = 0
    const [visibility, setVisibility] = useState(true)

    const productAssociationtRed = useSelector(state => state.productAssociationtRed);
    const { loading, frequentItems, error, success } = productAssociationtRed;

    useEffect(() => {
        if (!success) {
            props.history.push("/")
        }
    }, [success])

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
                            <button type="button" onClick={() => window.location.reload()} className="btn btn-primary btn-sm mx-1" >
                                <i className="fas fa-file "> Uplaod Another File </i>
                            </button>
                            <button type="button" className="btn btn-success btn-sm mx-1" >
                                <i className="fas fa-download"> Export </i>
                            </button>
                        </div>
                    </div>

                    <div>

                        <ul className="nav nav-tabs md-tabs nav-justified rounded-lg mb-3" id="myTab" role="tablist">
                            <li className="nav-item waves-effect waves-light" onClick={() => setVisibility(true)}>
                                <a className="nav-link active" id="table-association-tab-md" data-toggle="tab" href="#table-association-md" role="tab" aria-controls="table-association-md" aria-selected="true">Tablular View <span className="badge badge-primary"> {frequentItems?.totalFrequentItemsets} </span></a>
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
                                        </tr>
                                    </thead>
                                    <tbody id="myTable">
                                        {frequentItems && frequentItems?.frequentItemsets.map((data, index) =>
                                            <tr>
                                                <th scope="row">{serNo += 1}</th>
                                                <td>{data?.items?.join(' -> ')}</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                            :
                            <div>
                                <FrequentChartScreen frequentItemsets={frequentItems?.frequentItemsets} />
                            </div>
                        }
                    </div>
                </div>

            </div>

        </>
    )
}


export default DetailScreen