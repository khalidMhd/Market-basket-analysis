import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import Navbar from './Navbar';
import FrequentChartScreen from '../admin/chart.js/frequectChart';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import $, { data } from 'jquery'

const AdminDetailScreen = (props) => {
    const tableRef = useRef(null);
    let serNo = 0
    const [visibility, setVisibility] = useState(true)

    const productAssociationtRed = useSelector(state => state.productAssociationtRed);
    const { loading, frequentItems, error, success } = productAssociationtRed;


    const adminSignin = useSelector(state => state.adminSignin);
    const { adminInfo } = adminSignin;

    useEffect(() => {
        adminInfo ? props.history.push('/admin/detail') : props.history.push('/admin/signin')
    }, [adminInfo])

    useEffect(() => {
        if (!success) {
            props.history.push("/admin/dashboard")
        }
    }, [success])

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

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="download-table-xls-button btn btn-success mx-1 fas fa-download "
                                    // className="download-table-xls-button"
                                    table="table-to-xls"
                                    filename="product-association"
                                    sheet="tablexls"
                                    style={{ "textDecoration": "none", "color": "#fff" }}
                                    buttonText=" Export "
                                />

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
                                    <table ref={tableRef} id="table-to-xls" className="table table-bordered table table-hover">
                                        <thead>
                                            <tr className='table-active'>
                                                <th scope="col">S No.</th>
                                                <th scope="col">Association Items</th>
                                            </tr>
                                        </thead>
                                        <tbody id="myTable">
                                            {frequentItems && frequentItems?.frequentItemsets?.map((data, index) =>
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
            </main>
        </div>
    )
}

export default AdminDetailScreen