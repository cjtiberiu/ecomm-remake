import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productsReducer from './productsReducer';
import searchReducer from './searchReducer';
import cartReducer from './cartReducer';
import navReducer from './navReducer';

const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    search: searchReducer,
    cart: cartReducer,
    nav: navReducer
});

export default rootReducer;