import axios from 'axios';

export const getUserAddress = async (authtoken, address) => {
    return await axios.get(`${process.env.REACT_APP_API}/get-user-address`, {
        headers: {
            authtoken
        }
    })
}

export const updateUserAddress = async (authtoken, address) => {
    return await axios.post(`${process.env.REACT_APP_API}/update-user-address`, { address }, {
        headers: {
            authtoken
        }
    })
};