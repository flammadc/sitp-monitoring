import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    modal: true,
  },
  reducers: {
    loginStarted: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
    loginError: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    logoutAttempt: (state) => {
      state.modal = true;
    },
    logoutCanceled: (state) => {
      state.modal = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.modal = false;
    },
  },
});

export const {
  loginStarted,
  loginSuccess,
  loginError,
  logout,
  logoutAttempt,
  logoutCanceled,
} = userSlice.actions;

export default userSlice.reducer;
