import axios from 'axios';

export const createProduct = async (authtoken, product) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, 
    { product }, 
    {
        headers: {
            authtoken,
        },
    },
    );
};

export const getProducts = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/products`);
}

export const getProduct = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${id}`);
}

export const removeProduct = async (authtoken, id) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${id}`,
    {
        headers: {
            authtoken
        },
    }
    );
}

export const updateProduct = async (authtoken, id, product) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/${id}`,
    { product },
    {
        headers: {
            authtoken
        },
    }
    )
};

export const getProductsCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/products/total`);
}

export const getSortedProducts = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/products`,
    { sort, order, page },
    )
};

export const getRelated = async (sub) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/related/${sub}`,
    )
};

export const getProductRating = async (authtoken, id) => {
    return await axios.post(`${process.env.REACT_APP_API}/product/star/${id}`,
    {},
    {
        headers: {
            authtoken
        }
    }
    )
}

export const rateProduct = async (authtoken, id, star) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/star/${id}`,
    { star },
    {
        headers: {
            authtoken
        },
    },
    )
};

export const getFilteredProducts = async (query, price, category, stars, color, brand, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/products/search`,
    { text: query, price, category, stars, color, brand, sort: 'price', order: 'asc', page }
    )
}

export const getPriceRange = async (query) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/pricerange?query=${query}`)
}