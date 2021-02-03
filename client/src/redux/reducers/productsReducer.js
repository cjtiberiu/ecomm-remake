const INITIAL_STATE = {
    count: 0,
    inCart: 0,
};

const productsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS_COUNT':
            return { ...state, count: action.payload };
        case 'SET_CART_QTY':
            return { ...state, inCart: action.payload };
        default:
            return state;
    }
};

export default productsReducer;