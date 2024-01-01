import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import React from "react";
import axiosClient from "../configs/axios-client";
import { showErrorMessage } from "@/utils/helperFunctions";
import { IProviderInfo, UserType } from "@/@types/user";

type ActionType = { type: string; payload: any };

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  UPLOAD_AVATAR: "UPLOAD_AVATAR",
};

type initialValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  providerInfo: IProviderInfo;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (avatarFile: any, email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<any>;
  requestRestPassword: (email: string) => Promise<void>;
  updateProfile: (formData: FormData) => Promise<any>;
  ToggleReceiveOrders: () => void;
  getProviderInfo: () => Promise<any> | void;
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  providerInfo: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state: any, action: { payload: any }) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.UPLOAD_AVATAR]: (state: any, action: { payload: any }) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_IN]: (state: any, action: { payload: any }) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state: any, action: { payload: any }) => {
    return {
      ...state,
      isAuthenticated: false,
      user: action.payload,
    };
  },
};

const reducer = (state: any, action: ActionType) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

// export const AuthContext = createContext({ undefined });
export const AuthContext = createContext<initialValue | undefined>(undefined);
export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [authUser, setAuthUser] = useState<UserType | undefined>(undefined);
  const [providerInfo, setProviderInfo] = useState<IProviderInfo | undefined>(undefined);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const json = window.sessionStorage.getItem("user");
      const user = json == undefined ? undefined : JSON.parse(json);
      const token = window.sessionStorage.getItem("token");
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosClient.defaults.headers.common["Accept-Language"] =
        sessionStorage.getItem("language") == "ar" ? "ar" : "en";
      setAuthUser(user);
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: null,
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
    delete axiosClient.defaults.headers.common["Authorization"];
    const res = await axiosClient.post(
      "/auth/signin",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status == 200 || res.status == 201) {
      const { data: user } = res.data;
      window.sessionStorage.setItem("authenticated", "true");
      window.sessionStorage.setItem("token", user.access_token);
      window.sessionStorage.setItem("user", JSON.stringify(user));
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${user.access_token}`;
      axiosClient.defaults.headers.common["Accept-Language"] =
        sessionStorage.getItem("language") == "ar" ? "ar" : "en";
      user.id = user.id;
      user.avatar = user.avatar;
      user.name = user.name;
      user.username = user.username;
      user.role = user.role;
      setAuthUser(user);
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } else {
      throw new Error("Please check your username and password");
    }
  };

  const signUp = async (avatarFile: any, email: string, password: string, role: string) => {
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("role", role);
    bodyFormData.append("avatarFile", avatarFile);

    delete axiosClient.defaults.headers.common["Authorization"];

    try {
      const res = await axiosClient.post("/auth/register", bodyFormData, {
        headers: {
          "Content-Type": "mulitpart/form-data",
        },
      });
      console.log(res.data);
      if (res.status == 200 || res.status == 201) {
        return res;
      }
    } catch (error: any) {
      throw new Error(`${error?.response?.data?.message?.message[0]}`);
    }
  };

  const signOut = () => {
    window.sessionStorage.removeItem("authenticated");
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    delete axiosClient.defaults.headers.common["Authorization"];
    delete axiosClient.defaults.headers.common["Accept-Language"];
    dispatch({
      type: HANDLERS.SIGN_OUT,
      payload: {},
    });
  };

  const requestRestPassword = async (email: string) => {
    try {
      await axiosClient.post(`/auth/request-reset-password`, { email });
    } catch (error: any) {
      return error;
    }
  };

  const updateProfile = async (formData: FormData): Promise<any> => {
    try {
      const res = await axiosClient.put("/profile", formData, {
        headers: { "Content-Type": "application/multipart" },
      });
      if (authUser) {
        authUser.avatar = res?.data?.data.avatar;
        authUser.name = res?.data?.data.name;
        authUser.email = res?.data?.data.email;
        authUser.phone = res?.data?.data.phone;
        window.sessionStorage.setItem("user", JSON.stringify(authUser));
        setAuthUser(authUser);
        dispatch({
          type: HANDLERS.UPLOAD_AVATAR,
          payload: authUser,
        });
      }
      return res;
    } catch (err: any) {
      return Promise.reject(err);
    }
  };
  const ToggleReceiveOrders = () => {
    const receiveOrders = !state?.user?.receiveOrders;
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: { ...state?.user, receiveOrders },
    });
  };

  const getProviderInfo = async () => {
    try {
      const res = await axiosClient.get(`provider/info`);
      console.log(res?.data?.data);
      setProviderInfo(res?.data?.data);
      return res;
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        providerInfo,
        signOut,
        requestRestPassword,
        updateProfile,
        getProviderInfo,
        ToggleReceiveOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
