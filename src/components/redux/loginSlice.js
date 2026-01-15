import { createSlice } from "@reduxjs/toolkit";

const initialState={
    username:"", 
    token:"" , 
    userId:""
};

export const loginSlice = createSlice(
    {
        name: "login",
        initialState,
        reducers:  {
            setUser: (state,action)=>{
                state.username =action.payload.username;
                state.token=action.payload.token;
                state.userId=action.payload.userId;
                localStorage.setItem("username",state.username);
                localStorage.setItem("token",state.token);
                localStorage.setItem("userId",state.userId);
            },
            removeUser:(state)=>{
                state.username="";
                state.token="";
                state.userId="";
                localStorage.removeItem("username");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            }
        }
    }
)

export const {setUser,removeUser} = loginSlice.actions

export default loginSlice.reducer;