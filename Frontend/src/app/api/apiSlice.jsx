import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setCredentials } from '../../featurs/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:8000",
    credentials:"include",
    prepareHeaders:(headers, {getState})=>{
        const token = getState().auth.token;
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
})
// const baseQueryWithReauth = async (args, api, extraOptions)=>{
//     let result = await baseQuery(args, api, extraOptions);

//     if(result?.error?.status === 403){
//         // getting refresh token
//         const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
//         if(refreshResult?.data){
//             // storing the new token
//             api.dispatch(setCredentials({...refreshResult?.data}))
//             // retrying the orignal query
//             result = await baseQuery(args, api, extraOptions);

//         }else{
//             if(refreshResult?.error?.status===403){
//                 // refreshResult?.error?.data?.message = "Your Login Session has been expired"
//             }
//             return refreshResult;
//         }
//     }
//     return result;

// }

export const apiSlice = createApi({
    baseQuery,
    tagTypes:["paitent", "appointment", "doctor", "admin"],
    endpoints:builder=> ({})
})