import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,

    pending: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.userData = action.payload;
    },
    loginError: (state) => {
      state.error = true;
      state.pending = false;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { loginStart, loginSuccess, loginError, logout } =
  userSlice.actions;
export default userSlice.reducer;
