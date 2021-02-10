import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase.utils';
import { toast } from 'react-toastify';
import { createUpdateUser } from '../../utility/dbAuth';
import { useDispatch } from 'react-redux';

const Register = props => {

    const { history } = props;
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration', email));
    }, [email])

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords don\'t match');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);

            if (result.user.emailVerified) {

                // remove email from local storage
                window.localStorage.removeItem('emailForRegistration');

                // get user ID token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                // create the user in db
                createUpdateUser(idTokenResult.token)
                    .then(res => {
                        // set the user in redux store
                        dispatch({
                            type: "USER_LOADED",
                            payload: {
                              name: res.data.name,
                              email: res.data.email,
                              token: idTokenResult.token,
                              role: res.data.role,
                              _id: res.data._id,
                              address: res.data.address
                            },
                          });
                    })
                    .catch(err => console.log(err))


                // redirect
                history.push('/');
            }
        } catch (err) {
            toast.error(err.message);
        }
        

        
    }

    const completeRegisterForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    className='form-control pt-2 pb-2 mb-3 bg-white font-weight-bold' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Enter email"
                    disabled
                />
                <input 
                    type='password' 
                    className='form-control pt-2 pb-2 mb-3' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Enter Password"
                    autoFocus
                />
                 <input 
                    type='password' 
                    className='form-control pt-2 pb-2 mb-3' 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm Password"
                    
                />
                <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Submit</button>

            </form>
        )
    }

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h3>Complete Registration</h3>
                    
                    {completeRegisterForm()}
                </div>   
            </div>
        </div>
    )
};

export default Register;