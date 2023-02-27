import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const token = cookie.get('token');

export interface currentUser{
  current_user: {
    avatar: string,
    averageScore: number,
    bio: string,
    blogs: {
      _id: string,
    }[]
    createdAt: string,
    name: string,
    updatedAt: string,
    username: string,
    _id: string,
  } | null
}

const initialState: currentUser = {
  current_user: null,
}

export const userSlice = createSlice({
  name: "current_user",
  initialState,
  reducers: {
    setCurrent_user: (state, action) => {
      console.log(action)
      state.current_user = action.payload ;
    },
    logOut: state => {
      state.current_user= null;
      cookie.remove("token");
    }
  }
});

 export const { setCurrent_user,logOut } = userSlice.actions;
export default userSlice.reducer;