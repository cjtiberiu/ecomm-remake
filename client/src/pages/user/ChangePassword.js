import React, { useState } from 'react';
import { auth } from '../../firebase/firebase.utils';
import { toast } from 'react-toastify';

const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();

        if (newPassword !== newPasswordConfirm) {
            toast.error('Passwords don\'t match');
            return;
        };

        const user = auth.currentUser;
        user.updatePassword(newPassword)
            .then(() => {
                toast.success('Your password has been updated');
                setNewPassword('');
                setNewPasswordConfirm('');
            })
            .catch(err => toast.error(err))
    }

    return (
        <div className='col-md-4'>
            <h5 className='mb-4'>Change password</h5>
            
            <form onSubmit={handlePasswordChange}>
                <input 
                    type='password' 
                    className='form-control pt-2 pb-2 mb-3' 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    placeholder="New Password"
                    
                />
                <input 
                    type='password' 
                    className='form-control pt-2 pb-2 mb-3' 
                    value={newPasswordConfirm} 
                    onChange={e => setNewPasswordConfirm(e.target.value)} 
                    placeholder="Confirm New Password"
                    
                />

                <button 
                    className='btn btn-outline-dark mt-3' 
                    onClick={handlePasswordChange} 
                    type="light" 
                    shape="round" 
                    size='large'
                    disabled={newPassword.length < 6}
                >Change password</button>
            </form>
        </div>
    )
};

export default ChangePassword;