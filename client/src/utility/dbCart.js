import axios from "axios";

export const updateUserCart = async (authtoken, product, type) => {
    return await axios.post(`${process.env.REACT_APP_API}/update-user-cart`, { product, type }, {
        headers: {
            authtoken
        }
    })
};   

export const getCartItems = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/get-cart-items`, {
        headers: {
            authtoken
        }
    })
};  