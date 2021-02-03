import axios from 'axios';


export const createUpdateUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-update-user`, {}, {
        headers: {
            authtoken
        }
    })
};

export const getUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/getuser`, {}, {
        headers: {
            authtoken
        }
    })
};

export const getAdmin = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/getadmin`, {}, {
        headers: {
            authtoken
        }
    })
};

export const getAdminUser = async (authtoken, email) => {
    return await axios.post(`${process.env.REACT_APP_API}/get-user-for-admin/${email}`, 
    {},
    {
        headers: {
            authtoken
        }
    })
}