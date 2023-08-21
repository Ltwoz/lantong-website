import { createContext, useContext, useReducer } from "react";
import {
    GET_CONFIG_REQUEST,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_FAIL,
    UPDATE_CONFIG_REQUEST,
    UPDATE_CONFIG_SUCCESS,
    UPDATE_CONFIG_FAIL,
    UPDATE_CONFIG_RESET,
    CLEAR_ERRORS,
} from "../constants/config-constants";
import instanceApi from "@/config/axios-config";
import ConfigReducer from "@/reducers/config-reducer";

const ConfigContext = createContext();

export const ConfigContextProvider = (props) => {
    const configsFromSSR = props.value ? props.value : {};

    const initialState = {
        config: configsFromSSR,
        loading: false,
        error: null,
        isUpdated: false,
    };

    const [state, dispatch] = useReducer(ConfigReducer, initialState);

    //* Get Config
    const getConfig = async () => {
        try {
            dispatch({ type: GET_CONFIG_REQUEST });

            const { data } = await instanceApi.get("/api/website-config");

            dispatch({
                type: GET_CONFIG_SUCCESS,
                payload: data.config,
            });
        } catch (error) {
            dispatch({
                type: GET_CONFIG_FAIL,
                payload: error.response.data.message
            });
        }
    };

    //* Update Config
    const updateConfig = async (configsForm) => {
        try {
            dispatch({ type: UPDATE_CONFIG_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await instanceApi.patch(
                "/api/admin/website-config/update",
                configsForm,
                config
            );

            dispatch({
                type: UPDATE_CONFIG_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_CONFIG_FAIL,
                payload: error.response.data.message
            });
        }
    };

    //* Clear Errors
    const clearErrors = async () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <ConfigContext.Provider
            value={{
                config: state.config,
                loading: state.loading,
                error: state.error,
                isUpdated: state.isUpdated,
                getConfig,
                updateConfig,
                clearErrors,
                dispatch
            }}
        >
            {props.children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);