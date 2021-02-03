import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { toast } from 'react-toastify';

const ForgotPassword = props => {

    const { history } = props;
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);


    useEffect(() => {
        // Redirect user to homepage if user is already logged in
        if (user && user.token) history.push('/');
    }, [user])

    // firebase reset password link utility
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);


        const config = {
            url: process.env.REACT_APP_FORGOTPASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(res => {
                setEmail('');
                setLoading(false);
                toast.success('Check your email for password reset link');
            })
            .catch(error => {
                setLoading(false);
                toast.error(`${error.message}`);
            })
    }

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h3 className='mb-5'>Forgot Password</h3>

                    {
                        loading ? <div>Loading</div> : (

                            <form onSubmit={handleSubmit}>
                                <input 
                                    type='email' 
                                    className='form-control pt-2 pb-2' 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    placeholder="Enter email"
                                    autoFocus
                                />
                                <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Send reset password link</button>

                            </form>
                        )
                    }
                    
                    
                </div>   
            </div>
        </div>
    )
};

export default ForgotPassword;