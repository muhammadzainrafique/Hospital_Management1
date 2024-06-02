import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "../auth/authSlice";
const paitentApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
      
        getAllPaitents:builder.query({
            query:()=>"/paitent/all",
            providesTags:["paitent"]
        }),
        getPaitent:builder.query({
            query:(userId)=>`/paitent/getPaitent/${userId}`,
            providesTags:["paitent"]
        }),
        updatePaitent:builder.mutation({
            query:({userId, data})=>({
                url:`/paitent/${userId}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:["paitent"]
        }),
        deletePaitent:builder.mutation({
            query:(userId)=>({
                url:`/paitent/${userId}`,
                method:'DELETE',
            }),
            invalidatesTags:["paitent"]
        }),
          createPaitent:builder.mutation({
            query:(data)=>({
                url:`/paitent/register`,
                method:'POST',
                body:{...data}
            }),
            invalidatesTags:["paitent"],
        async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try {
                const { data } = queryFulfilled;
                dispatch(setCredentials(data));
            } catch (error) {
                console.log(error);
            }
        }
        }),
    })
})

export const {
    useCreatePaitentMutation,
    useDeletePaitentMutation,
    useGetAllPaitentsQuery,
    useGetPaitentQuery,
    useUpdatePaitentMutation
} = paitentApiSlice;