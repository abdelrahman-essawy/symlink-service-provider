import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import axiosClient from '../configs/axios-client'


type UserType = {
  id: string,
  username: string,
  name: string,
  avatar: string,
  role: "CLIENT" | "SERVICE_PROVIDER" | "ADMIN"
};

type ActionType = { type: string, payload: any }

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

type initialValue = {
  isAuthenticated: boolean,
  isLoading: boolean,
  user: any,
  signIn: (username: string, password: string) => Promise<void>,
  signUp: (username: string, email:string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
  ToggleReceiveOrders:()=>void,
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state: any, action: { payload: any; }) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state: any, action: { payload: any; }) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state: any) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state: any, action: ActionType) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

// export const AuthContext = createContext({ undefined });
export const AuthContext = createContext<initialValue | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user: UserType = state.user;
      console.log(state.user);
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: null
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username: string, password: string) => {
    const user: UserType = {
      id: '',
      avatar: '',
      name: '',
      username: '',
      role: 'CLIENT'
    };
    const res = await axiosClient.post('/auth/signin', { username, password });

    if (res.status == 200) {
      const { data } = res.data;
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('token', data.access_token);
      user.id = data.id;
      user.avatar = data.avatar;
      user.name = data.name;
      user.username = data.username;
      user.role = data.role;
    }
    else {
      throw new Error('Please check your username and password');
    }
    // console.log(username);

    // const addDataToSessionStorage = (user: UserType) => {
    //   sessionStorage.setItem('authenticated', 'true');
    //   sessionStorage.setItem('token', 'fake-token');
    // }

    // switch (username) {
    //   case 'admin':
    //     user.id = '1';
    //     user.avatar = 'https://i.pravatar.cc/300';
    //     user.name = 'Admin';
    //     user.username = 'admin';
    //     user.role = 'ADMIN';
    //     addDataToSessionStorage(user);
    //     break;
    //   case 'client':
    //     user.id = '2';
    //     user.avatar = 'https://i.pravatar.cc/300';
    //     user.name = 'Client';
    //     user.username = 'client';
    //     user.role = 'CLIENT';
    //     addDataToSessionStorage(user);
    //     break;
    //   case 'service_provider':
    //     user.id = '3';
    //     user.avatar = 'https://i.pravatar.cc/300';
    //     user.name = 'Service Provider';
    //     user.username = 'service_provider';
    //     user.role = 'SERVICE_PROVIDER';
    //     addDataToSessionStorage(user);
    //     break;
    //   default:
    //     throw new Error('Please check your username and password');
    // }



    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (username: any, email: any, password: any) => {
    const user: UserType = {
      id: '',
      avatar: '',
      name: '',
      username: '',
      role: 'CLIENT'
    };
    const res = await axiosClient.post('/auth/register', { username, email, password });
    if (res.status == 200) {
      const { data } = res.data;
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('token', data.access_token);
      user.id = data.id;
      user.avatar = data.avatar;
      user.name = data.name;
      user.username = data.username;
      user.role = data.role;
    }
    else {
      throw new Error('Please check your username and password');
    }

    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
      payload: null
    });
  };
  const ToggleReceiveOrders = () => {
    const receiveOrders = !(state?.user?.receiveOrders);
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: {...state?.user,receiveOrders}
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        ToggleReceiveOrders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);