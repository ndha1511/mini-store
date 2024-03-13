import { createSlice } from '@reduxjs/toolkit';
import { getItemToLocalStorage } from '../../utils/localStorageHandle';

const user = getItemToLocalStorage("user");

const initialState = {
    user: user ? user : null
  }
  
  export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginState: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loginState, logout } = userReducer.actions
  
  export default userReducer.reducer