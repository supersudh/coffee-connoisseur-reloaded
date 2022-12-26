import React, { createContext, useReducer } from 'react';
import type { AppProps } from 'next/app'

import '../styles/globals.css'

export const StoreContext = createContext({});

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES'
};

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latLong: action.payload.latLong
      };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }: any) => {

  const initialState = {
    latLong: '',
    coffeeStores: [],
  };
  
  const [state, dispatch] = useReducer(storeReducer, initialState); // todo fix no overload matches this call warning

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div>
        <Component {...pageProps} />{" "}
        <footer>
          <p>© {new Date().getFullYear()} supersudh</p>
        </footer>
      </div>
    </StoreProvider>
  );
}
