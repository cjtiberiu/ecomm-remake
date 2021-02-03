const INITIAL_STATE = {
    current: '',
};

const navReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT':
            return { ...state, current: action.payload };
        default:
            return state;
    }
};

export default navReducer;