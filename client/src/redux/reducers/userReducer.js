

const userReducer = (state = null, action) => {
    switch(action.type) {
        case "USER_LOADED":
            return action.payload;
        case "USER_LOGIN_SUCCES":
            return action.payload;
        case "USER_LOGIN_FAIL":
            return null;
        case "USER_LOGOUT":
            return null;
        default:
            return state;
    }
};

export default userReducer;