import React from 'react';
import Navbar from './Navbar';
import contactImg from './assets/contact.png'
const ContactScreen = () => {
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

                            <form>
                                {/* <div className="form-group ">
                                    <input type="text" className="form-control rounded border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlInput1" placeholder="Name" />
                                </div>

                                <div className="form-group">
                                    <input type="email" className="form-control rounded border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlInput1" placeholder="Email" />
                                </div> */}


                                <div className="form-group custom-file mb-3">
                                    <input type="file" className="custom-file-input " id="customFile" accept=".pdf" />
                                    <label className="form-control rounded border-top-0 border-left-0 border-right-0 custom-file-label bg-light rounded" for="customFile">Choose file (Optional) </label>
                                </div>

                                <div className="form-group">
                                    <textarea className="form-control rounded border-top-0 border-left-0 border-right-0 bg-light rounded" id="exampleFormControlTextarea1" placeholder="Message" rows="3" />
                                </div>

                                <div className="text-center">
                                    <button type="button" className="btn btn-success  text-center">
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