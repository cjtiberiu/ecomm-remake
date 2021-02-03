const INITIAL_STATE = {
    query: '',
    price: [],
    category: '',
    stars: '',
    color: '',
    brand: ''
};

const searchReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_SEARCH_QUERY':
            return { ...state, query: action.payload};
        case 'SET_SEARCH_PRICE':
            return { ...state, price: action.payload };
        case 'SET_SEARCH_CATEGORY':
            return { ...state, category: action.payload };
        case 'SET_SEARCH_STARS':
            return { ...state, stars: action.payload };
        case 'SET_SEARCH_COLOR':
            return { ...state, color: action.payload };
        case 'SET_SEARCH_BRAND':
            return { ...state, brand: action.payload };
        default:
            return state
    }
};

export default searchReducer;