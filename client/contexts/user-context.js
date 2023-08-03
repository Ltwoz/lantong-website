import instanceApi from "@/config/axios-config";
import {
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from "@/constants/user-constants";
import UserReducer from "@/reducers/user-reducer";
import axios from "axios";

const { createContext, useReducer, useEffect, useContext } = require("react");

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const initialState = {
        loading: false,
        isAuthenticated: false,
        status: "loading",
        user: {},
        error: null,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const login = async (email, password) => {
        try {
            dispatch({ type: LOGIN_REQUEST });

            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                credentials: "include",
            };

            const { data } = await instanceApi.post(
                `/api/auth/login`,
                {
                    email,
                    password,
                },
                config
            );

            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error?.response?.data?.message,
            });
        }
    };

    const register = async (userData) => {
        try {
            dispatch({ type: REGISTER_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await instanceApi.post(
                `/api/auth/register`,
                userData,
                config
            );

            dispatch({ type: REGISTER_SUCCESS, payload: data.user });
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    // Logout User
    const logout = async () => {
        try {
            await instanceApi.get(`/api/auth/logout`);

            dispatch({ type: LOGOUT_SUCCESS });
        } catch (error) {
            dispatch({
                type: LOGOUT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                dispatch({ type: LOAD_USER_REQUEST });

                const { data } = await instanceApi.get(`/api/me`);

                dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
            } catch (error) {
                dispatch({
                    type: LOAD_USER_FAIL,
                    payload: error.response.data.message,
                });
            }
        };

        loadUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                error: state.error,
                status: state.status,
                login,
                register,
                logout,
                clearErrors,
                dispatch,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
