import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userEmail:"", 
    token:"" , 
    userId:""
};

export const loginSlice = createSlice(
    {
        name: "login",
        initialState,
        reducers:  {
            setUser: (state,action)=>{
                state.userEmail =action.payload.email;
                state.token=action.payload.token;
                state.userId=action.payload.userId;
                localStorage.setItem("userEmail",state.userEmail);
                localStorage.setItem("token",state.token);
                localStorage.setItem("userId",state.userId);
            },
            removeUser:(state)=>{
                state.userEmail="";
                state.token="";
                state.userId="";
                localStorage.removeItem("userEmail");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            }
        }
    }
)

export const {setUser,removeUser} = loginSlice.actions

export default loginSlice.reducer;