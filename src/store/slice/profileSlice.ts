import { createSlice } from '@reduxjs/toolkit'
import {  loginCheck } from '../services/Auth.service';



export interface profileSlice {
  loading: boolean,
  logout_loading:boolean,
  userProfile:any,
  token:any
}

const initialState:profileSlice = {
  loading: false,
  logout_loading:false,
  userProfile:null,
  token:null
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    checkLoginDetail:(state,action)=>{
        // console.log("Check Login"); 
        if (state?.userProfile === null  ) {
          const localData = localStorage.getItem("userProfile");
            let userProfile = JSON.parse(`${localData}`);
            // console.log(userProfile);
            state.userProfile=userProfile;
        }
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(loginCheck.pending,(state,action)=>{
      state.loading = true;
    });
    builder.addCase(loginCheck.fulfilled,(state,action)=>{
      state.loading = false;
      let userData=action.payload;
      console.log("loginCheck.fulfilled",userData);
      state.userProfile=userData.userProfile;
      state.token=userData.token;

    })
    builder.addCase(loginCheck.rejected,(state,action)=>{
      state.loading = false;
    })



  }

})

// Action creators are generated for each case reducer function
export const { checkLoginDetail } = authSlice.actions

export default authSlice.reducer