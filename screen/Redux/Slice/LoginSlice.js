import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    user: {
      id: null,
    },
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      console.log('state, action.payload', state, action.payload);
      state.isLoggedIn = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
    setLoggedOut: (state, action) => {
      state.isLoggedIn = false;
      state.user = {
        id: null,
      };
    },
  },
});

export const {setIsLoggedIn, setLoggedInUser, setLoggedOut} =
  loginSlice.actions;
export default loginSlice.reducer;
