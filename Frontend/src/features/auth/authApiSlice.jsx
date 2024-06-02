import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        authDoctor:builder.mutation({
            query:(credentials)=>({
                url:"/auth/doctor",
                method:'POST',
                body:{...credentials}
            })
        }),
        authPaitent:builder.mutation({
            query:(credentials)=>({
                url:"/auth/paitent",
                method:'POST',
                body:{...credentials}
            })
        }),
        authAdmin:builder.mutation({
            query:(credentials)=>({
                url:"/auth/admin",
                method:'POST',
                body:{...credentials}
            })
        }),
        logout:builder.mutation({
            query:()=>({
                method:"POST",
                url:'/auth/logout'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try {
                    
                    await queryFulfilled;
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error)
                }
            }
        }),
       
    })
})

export const {
    useAuthDoctorMutation,
    useAuthPaitentMutation,
    useLogoutMutation,
    useAuthAdminMutation
} = authApiSlice

// refresh:builder.mutation({
//     query:()=>({
//         method:'GET',
//         url:'/auth/refresh'
//     }),
//     async onQueryStarted(arg, {queryFulfilled, dispatch}){
//         try {
//             const { data } = queryFulfilled;
//             dispatch(setCredentials(data));
//         } catch (error) {
//             console.log(error);
//         }
//     }
// })