import { createSlice } from '@reduxjs/toolkit'

const apiSlice = createSlice({
    name:"auth",
    initialState:{token:null, userId:null, role:null},
    reducers:{
        setCredentials:(state, action)=>{
            console.log(action);
            const { accessToken, userId, role} = action?.payload?.Message;
            state.token = accessToken;
            state.userId = userId
            state.role = role
        },
        logout:(state, action)=>{
            state.token = null;
            state.userId = null;
            state.role = null;
        }
    }
})

export default apiSlice.reducer;
export const { setCredentials, logout} = apiSlice.actions

export const selectCurrntToken = (state)=> state.token