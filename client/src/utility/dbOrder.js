import axios from 'axios';

export const addOrder = async (authtoken, items) => {
    return await axios.post(`${process.env.REACT_APP_API}/addorder`, 
    { items }, 
    {
        headers: {
            authtoken,
        },
    },
    );
};

export const getAdminOrders = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/get-admin-orders`,
    {
        headers: {
            authtoken,
        },
    },
    );
};

export const getUserOrders = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/get-user-orders`,
    {
        headers: {
            authtoken,
        },
    },
    );
};

export const getOrder = async (authtoken, id) => {
    return await axios.get(`${process.env.REACT_APP_API}/getorder/${id}`,
    {
        headers: {
            authtoken,
        },
    },
    );
}