import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "../auth/authSlice";
const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
      
        getAllDoctors:builder.query({
            query:()=>"/doctor/all",
            providesTags:["doctor"]
        }),
        getDoctor:builder.query({
            query:(userId)=>`/doctor/getDoctor/${userId}`,
            providesTags:["doctor"]
        }),
        updateDoctor:builder.mutation({
            query:({userId, data})=>({
                url:`/doctor/${userId}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:["doctor"]
        }),
        deleteDoctor:builder.mutation({
            query:(userId)=>({
                url:`/doctor/${userId}`,
                method:'DELETE',
            }),
            invalidatesTags:["doctor"]
        }),
          createDoctor:builder.mutation({
            query:(data)=>({
                url:`/doctor/register`,
                method:'POST',
                body:{...data}
            }),
            invalidatesTags:["doctor"],
        async onQueryStarted(arg, {queryFulfilled, dispatch}){
            try {
                const { data } = await queryFulfilled;
                dispatch(setCredentials(data));
            } catch (error) {
                console.log(error);
            }
        }
        }),
    })
})

export const {
    useDeleteDoctorMutation,
    useGetAllDoctorsQuery,
    useGetDoctorQuery,
    useUpdateDoctorMutation,
    useCreateDoctorMutation
} = doctorApiSlice;