import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/auth'
import { ThunkAction } from "redux-thunk";
import { RootState } from '../rootReducer';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';


export const loginCheck = createAsyncThunk<any, any, { state: RootState }>('user/loginCheck', async (payload) => {
  try {
    console.log("Login Credential", payload);
    const response = await login({ email: "", password: "", ...payload });
    const userResponse = response.data;
    if (userResponse.success) {
      localStorage.setItem("userProfile",JSON.stringify(userResponse.data));
      localStorage.setItem("userToken",JSON.stringify(userResponse.token));
      return {userData:userResponse.data,token:userResponse.token};
    }
    return null;
  } catch (error) {
    throw error;
  }
}
);

