import { createContext, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_AUTH":
            return {
                ...state,
                userInfo: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                userInfo: null
            }
        default:
            return state;
    }
};

const INITIAL_STATE = {
    userInfo: JSON.parse(localStorage.getItem("user")) || null
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    
    const [state, authDispatch] = useReducer(reducer, INITIAL_STATE);

    const value = {
        state,
        authDispatch
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
};

