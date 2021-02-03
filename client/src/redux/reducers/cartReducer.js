import { getCartQty, getCartTotal } from './cartUtility';

const INITIAL_STATE = {
    items: [],
    itemsCount: 0,
    totalAmount: 0,
    visibleDrawer: false
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_CART_ITEMS':
            return { ...state, items: action.payload, itemsCount: getCartQty(action.payload), totalAmount: getCartTotal(action.payload) };
        case 'OPEN_DRAWER':
            return { ...state, visibleDrawer: true };
        case 'CLOSE_DRAWER':
            return { ...state, visibleDrawer: false };
        case 'CLEAR_CART':
            return { ...state, items: [], itemsCount: 0, visibleDrawer: false };
        default:
            return state;
    }
};

export default cartReducer;