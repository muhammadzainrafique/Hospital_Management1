import { apiSlice } from "../../app/api/apiSlice";
const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
      
        getAllAdmin:builder.query({
            query:()=>"/admin/all",
            providesTags:["admin"]
        }),
        getAdmin:builder.query({
            query:(userId)=>`/admin/getAdmin/${userId}`,
            providesTags:["admin"]
        }),
        updateAdmin:builder.mutation({
            query:({userId, data})=>({
                url:`/admin/${userId}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:["admin"]
        }),
        deleteAdmin:builder.mutation({
            query:(userId)=>({
                url:`/admin/${userId}`,
                method:'DELETE',
            }),
            invalidatesTags:["admin"]
        }),
          createAdmin:builder.mutation({
            query:(data)=>({
                url:`/admin/register`,
                method:'POST',
                body:{...data}
            }),
            invalidatesTags:["admin"],
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
    useDeleteAdminrMutation,
    useGetAllAdminrsQuery,
    useGetAdminrQuery,
    useUpdateAdminrMutation,
    useCreateAdminMutation
} = adminApiSlice;