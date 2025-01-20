import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {
    fullName: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { fullName: '', email: '' };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
