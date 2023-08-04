import {
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    LOAD_USER_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
} from "@/constants/user-constants";

const UserReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {
                isAuthenticated: false,
            };
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                status: "loading",
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                status: "authenticated",
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
                status: "unauthenticated",
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                status: "unauthenticated",
            };

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                status: "unauthenticated",
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: "authenticated",
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export default UserReducer;
