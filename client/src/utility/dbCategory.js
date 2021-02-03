import axios from 'axios';

export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`);
}

export const getCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}

export const createCategory = async (authtoken, name) => {
    return await axios.post(`${process.env.REACT_APP_API}/category`, 
    { name }, 
    {
        headers: {
            authtoken,
        },
    },
    );
}

export const removeCategory = async (authtoken, slug) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,
    {
        headers: {
            authtoken
        },
    },
    )
}

export const updateCategory = async (authtoken, name, slug) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,
    { name },
    {
        headers: {
            authtoken
        }
    }
    )
}