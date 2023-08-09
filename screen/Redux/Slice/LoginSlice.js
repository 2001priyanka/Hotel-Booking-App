import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    user: {
      id: null,
    },
    isTenant: true,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      console.log('state, action.payload', state, action.payload);
      state.isLoggedIn = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
      console.log('action.payload', action.payload);
      let isTenant = false;
      action.payload?.user?.allocations.map(item => {
        if (item.status == 'APPROVED') {
          isTenant = true;
        }
      });
      state.isTenant = isTenant;
    },
    setLoggedOut: (state, action) => {
      state.isLoggedIn = false;
      state.user = {
        id: null,
      };
      state.isTenant = false;
    },
  },
});

export const {setIsLoggedIn, setLoggedInUser, setLoggedOut} =
  loginSlice.actions;
export default loginSlice.reducer;
