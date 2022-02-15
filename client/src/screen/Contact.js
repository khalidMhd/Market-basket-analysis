import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import contactImg from './assets/contact.png'
import { useDispatch, useSelector } from 'react-redux';
import { messageRequest } from '../action/message';

const ContactScreen = (props) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [file, setFile] = useState("")
    var formData = new FormData();
    formData.append('file', file);
    formData.append('message', message);
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const messageRequestRed = useSelector(state => state.messageRequestRed);
    const { loading, success, messageReq, error } = messageRequestRed;

    useEffect(() => {
        userInfo ? props.history.push('/contact') : props.history.push('/signin')
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(messageRequest(formData))
    }
    return (
        <>
            <Navbar />
            <div className="m-4">
                <div className='cart shadow bg-white rounded p-3 '>
                    <div className="row justify-content-around my-3">
                        <div className="col-sm-4 d-flex align-items-center justify-content-center">
                            <img width="60%" src={contactImg} />
                        </div>

                        <div className="col-sm-6">
                            <h3 className='text-muted text-center pb-3'>Get in touch </h3>

                            <form onSubmit={submitHandler}>

                                {loading &&
                                    <div class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                                {error && <div className="text-danger text-center h6">{error.message}</div>}
                                {success && <div className="text-primary text-center h6">{messageReq.message}</div>}


                                <div className="form-group custom-file mb-3">
                                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className="custom-file-input " id="customFile"  />
                                    <label  className="form-control rounded border-top-0 border-left-0 border-right-0 custom-file-label bg-light rounded" for="customFile">{file?  file?.name:  "Choose file (Optional)"} </label>
                                </div>

                                <div className="form-group">
                                    <textarea onChange={(e) => setMessage(e.target.value)} className="form-control rounded border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlTextarea1" placeholder="Message" rows="3" required />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success  text-center">
                                        Send <i className="fas fa-arrow-right">  </i>
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

export default ContactScreen