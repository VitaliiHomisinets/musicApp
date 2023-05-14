import React, { createContext, useContext, useReducer } from 'react';


export const StateContext = createContext();

export const StateProvider = ({children, initialSate, reducer}) => (
    <StateContext.Provider value = {useReducer(reducer,initialSate)}>
        {children}
    </StateContext.Provider>
);
export const useStateProvider = () => useContext(StateContext);