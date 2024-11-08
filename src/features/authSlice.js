"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const isClientEnv = typeof window !== "undefined";

const initialState = {
  user:
    isClientEnv && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  accessToken:
    isClientEnv && localStorage.getItem("accessToken")
      ? JSON.parse(localStorage.getItem("accessToken"))
      : null,
  refreshToken:
    isClientEnv && localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken"))
      : null,
  isActivePlan:
    isClientEnv && localStorage.getItem("isActivePlan")
      ? JSON.parse(localStorage.getItem("isActivePlan"))
      : null,
  watchlist:
    isClientEnv && localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : null,
  // watchlist:[],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  //  {
  //     user: null,
  //     accessToken: null,
  //     refreshToken: null,
  //   },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      const token = JSON.stringify(action.payload);
      localStorage.setItem("accessToken", token);
      Cookies.set("accessToken", action.payload, {
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      });
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      const token = JSON.stringify(action.payload);
      localStorage.setItem("refreshToken", token);
      Cookies.set("refreshToken", action.payload, {
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      });
    },
    setIsActivePlan: (state, action) => {
      state.isActivePlan = action.payload;
      localStorage.setItem("isActivePlan", JSON.stringify(action.payload));
    },
    addToWatchlist: (state, action) => {
      const videoId = action.payload;
      if (!state.watchlist.includes(videoId)) {
        state.watchlist.push(videoId);
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action) => {
      const videoId = action.payload;
      state.watchlist = state.watchlist.filter((id) => id !== videoId);
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isActivePlan = null;
      state.watchlist = [];
      localStorage.clear();
    },
  },
});

export const {
  setUser,
  setAccessToken,
  setRefreshToken,
  setIsActivePlan,
  clearAuth,
} = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
