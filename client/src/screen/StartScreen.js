import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import uplaodImg from './assets/upload.png'
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../action/user';
import { productAssociationAction } from '../action/association';

const StartScreen = (props) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState("")
    const [support, setSupport] = useState(1)
    const [apiKey, setApiKey] = useState("fp-growth-excel")

    var formData = new FormData();
    formData.append('file', file);
    formData.append('support', support);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productAssociationtRed = useSelector(state => state.productAssociationtRed);
    const { loading, frequentItems, error, success } = productAssociationtRed;

    useEffect(() => {
        userInfo ? props.history.push('/') : props.history.push('/signin')
        // dispatch(refreshUser())
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(productAssociationAction(apiKey, formData))
    }

    return (
        <>
            <Navbar />
            <div className="m-4">
                {loading ?
                    <div className='text-center' style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%"
                    }}>
                        <h6 className="">It take few minutes</h6>
                        <div className="spinner-border text-primary" style={{ width: "50px", height: "50px" }} role="status">
                            <div className="sr-only ">Loading...</div>
                        </div>
                    </div> :
                    <div className='cart shadow bg-white rounded p-3  '>
                        <div className="row justify-content-around my-3">
                            <div className="col-sm-4 d-flex align-items-center justify-content-center">
                                <img width="40%" src={uplaodImg} />
                            </div>
                            <div className="col-sm-6">
                                <h3 className='text-muted text-center pb-3'>Import Dataset </h3>

                                <form onSubmit={submitHandler}>
                                    {error && <div className="text-danger text-center h6">{error.message}</div>}
                                    {success && <div className="text-primary text-center h6">{props.history.push("/frequent-itemset")}</div>}

                                    <div className="form-group">
                                        <select onChange={(e) => setApiKey(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlSelect1" required>
                                            <option disabled selected>Select File Type</option>
                                            <option value="fp-growth-json">JSON</option>
                                            <option value="fp-growth-excel">Excel</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select onChange={(e) => setSupport(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlSelect1" required>
                                            <option disabled selected>Select Support(Association Strength) </option>
                                            <option value="1">10%</option>
                                            <option value="2">20%</option>
                                            <option value="3">30%</option>
                                            <option value="4">40%</option>
                                            <option value="5">50%</option>
                                        </select>
                                    </div>

                                    <div className="form-group custom-file mb-3">
                                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="custom-file-input" id="customFile" accept="" />
                                        <label className="form-control rounded border-top-0 border-left-0 border-right-0 custom-file-label bg-light rounded" for="customFile">{file ? file?.name : "Choose file"} </label>
                                    </div>


                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success">
                                            <i className="fas fa-file"> Uplaod File </i>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default StartScreen