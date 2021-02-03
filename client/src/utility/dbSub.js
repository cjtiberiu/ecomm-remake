import axios from 'axios';

export const getSubCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subs`);
}

export const getSubCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
}

export const createSubCategory = async (authtoken, name, parent) => {
    return await axios.post(`${process.env.REACT_APP_API}/sub`, 
    { name, parent }, 
    {
        headers: {
            authtoken,
        },
    },
    );
}

export const removeSubCategory = async (authtoken, slug) => {
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,
    {
        headers: {
            authtoken
        },
    },
    )
}

export const updateSubCategory = async (authtoken, name, parent, slug) => {
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,
    { name, parent },
    {
        headers: {
            authtoken
        }
    }
    )
}