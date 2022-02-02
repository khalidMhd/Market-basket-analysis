import React, { useEffect } from 'react';
import Navbar from './Navbar';
import uplaodImg from './assets/upload.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../action/user';
const StartScreen = (props) => {
    const dispatch = useDispatch()
    const submitHandler = () => {
        props.history.push('/detail')
    }


  const userSignin = useSelector(state => state.userSignin);
    const { loading, success, userInfo, error } = userSignin;

    useEffect(() => {
            userInfo ? props.history.push('/') : props.history.push('/signin')
            dispatch(refreshUser())
        }, [userInfo])

    return (
        <>
            <Navbar />
            <div className="m-4">
                <div className='cart shadow bg-white rounded p-3 '>
                    <div className="row justify-content-around my-3">
                        <div className="col-sm-4 d-flex align-items-center justify-content-center">
                            <img width="40%" src={uplaodImg} />
                        </div>
                        <div className="col-sm-6">
                            <h3 className='text-muted text-center pb-3'>Uplaod File </h3>

                            <form>
                                <div className="form-group">
                                    <select className="form-control border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlSelect1" required>
                                        <option value="" disabled selected>Select File Type</option>
                                        <option value="">JSON</option>
                                        <option value="">Excel</option>
                                    </select>
                                </div>

                                <div className="form-group custom-file mb-3">
                                    <input type="file" className="custom-file-input" id="customFile" accept=".pdf" />
                                    <label className="form-control rounded border-top-0 border-left-0 border-right-0 custom-file-label bg-light rounded" for="customFile">Choose file</label>
                                </div>


                                <div className="text-center">
                                    <button onClick={submitHandler} type="button" className="btn btn-success">
                                        <i className="fas fa-file"> Uplaod File </i>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartScreen