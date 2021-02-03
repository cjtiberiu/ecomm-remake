import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const LoadingToRedirect = () => {

    const [count, setCount] = useState(2);
    const history = useHistory();

    // if the private route requirements are not met redirect the user to login page with 2 second countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        count === 0 && history.push('/login');

        return () => clearInterval(interval);
    }, [count, history])

    return (
        <div className='container p-5 text-center'>
            <Spinner />
        </div>
    )

};

export default LoadingToRedirect;