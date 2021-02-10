import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { toast } from 'react-toastify';

const Register = props => {

    const { history } = props;
    const [email, setEmail] = useState('');
    const user = useSelector(state => state.user);


    useEffect(() => {
        // Redirect user to homepage if user is already logged in
        if (user && user.token) history.push('/');
    }, [user, history])


    const handleSubmit = (e) => {

        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        auth.sendSignInLinkToEmail(email, config)
            .then(function() {
                
                toast.success(`Verification email has been sent to ${email}`);
                window.localStorage.setItem('emailForRegistration', email);
                setEmail('');
            })
            .catch(function(error) {
                toast.error('Error', error);
            });
    }

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    className='form-control pt-2 pb-2' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Enter email"
                    autoFocus
                />
                <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Send verification link</button>

            </form>
        )
    }

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h3 className='mb-5'>Register</h3>
                    
                    {registerForm()}
                </div>   
            </div>
        </div>
    )
};

export default Register;