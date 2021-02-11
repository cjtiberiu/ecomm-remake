const INITIAL_STATE = {
    current: '',
    selectedKeys: 'all'
};

const navReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT':
            return { ...state, current: action.payload };
        case 'SET_OPEN_MENU':
            return { ...state, selectedKeys: action.payload };
        default:
            return state;
    }
};

export default navReducer;