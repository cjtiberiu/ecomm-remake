import axios from 'axios';

export const addToWishlist = async (authtoken, product) => {
    return await axios.post(`${process.env.REACT_APP_API}/add-to-wishlist`, { product }, {
        headers: {
            authtoken
        }
    })
};   

export const removeFromWishlist = async (authtoken, id) => {
    return await axios.post(`${process.env.REACT_APP_API}/remove-from-wishlist`, { id }, {
        headers: {
            authtoken
        }
    })
};

export const getWishlist = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/getwishlist`, 
    {
        headers: {
            authtoken
        }
    }
    )
}