import React, { useEffect } from 'react';
import Navbar from './Navbar';
import contactImg from './assets/contact.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accountConformation } from '../action/auth';
const VerifiedScreen = (props) => {
    const dispatch = useDispatch()
    const token = props.match.params.token
    const accountConformationRed = useSelector(state => state.accountConformationRed);
    const { loading, success, accConfirm, error } = accountConformationRed;
    
    useEffect(() => {
        if (token) {
            dispatch(accountConformation(token))
        }

    }, [token])

    return (
        <>
            {loading?
                <div class="d-flex justify-content-center align-items-center vh-100">
                    <div class="spinner-border text-primary " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>:
            
            <div className="jumbotron text-center">
                <h1 className="display-3">Thank You!</h1>
                {error && <p className="lead text-danger"><strong>{error.message}</strong></p>}
                {success && <p className="lead"><strong>{accConfirm.message}</strong></p>}

                {/* <hr> */}
                {/* <p>
                Having trouble? <a href="">Contact us</a>
                </p> 
                */}
                <p className="lead">
                    <Link to='/signin' className="btn btn-primary btn-sm" role="button">Continue to login</Link>
                </p>
            </div>
}
        </>
    )
}

export default VerifiedScreen