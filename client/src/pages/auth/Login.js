import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ANT DESIGN
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

// FIREBASE
import { auth, googleAuthProvider } from '../../firebase/firebase.utils';

// TOASTIFY
import { toast } from 'react-toastify';

import { createUpdateUser } from '../../utility/dbAuth';


const Login = props => {

    const { history } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.user);


    useEffect(() => {
        // Redirect user to homepage if user is already logged in
        if (user && user.token) history.push('/');
    }, [user, history])


    const handleEmailLogIn = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            toast.error('You must enter all fields');
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);

            toast.success('You have succesfully signed in');
            history.push('/');

        } catch (error) {
            toast.error(error.message);
        }
  
    }

    const handleGoogleLogin = () => {
        return auth.signInWithPopup(googleAuthProvider)
            .then(async result => {
                toast.success('You have succesfully signed in');
                const idTokenResult = await result.user.getIdTokenResult();
                createUpdateUser(idTokenResult.token);
                history.push('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    const loginForm = () => {
        return (
            <form>
                <input 
                    type='email' 
                    className='form-control pt-2 pb-2 mb-3' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email"
                    autoFocus
                />
                <input 
                    type='password' 
                    className='form-control pt-2 pb-2 mb-3' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password"
                    
                />
                <Button 
                    className='w-100 mb-3' 
                    onClick={handleEmailLogIn} 
                    type="light" 
                    shape="round" 
                    icon={<MailOutlined />} 
                    size='large'
                    disabled={!email || password.length < 6}
                >Sign In With Email</Button>

                <Button 
                    className='w-100 mb-3'
                    onClick={handleGoogleLogin}
                    type="danger" 
                    shape="round" 
                    icon={<GoogleOutlined />} 
                    size='large'
                >Sign In With Google</Button>

                <Link to='/forgotpassword' className='float-right'>Forgot password?</Link>

            </form>
        )
    }

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h2 className='text-center mb-5'>Login</h2>
                    
                    {loginForm()}
                </div>   
            </div>
        </div>
    )
};

export default Login;