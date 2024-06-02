import { apiSlice } from "../../app/api/apiSlice";
const appointmentApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        createAppointment:builder.mutation({
            query:(data)=>({
                url:'/appointment/new',
                method:'POST',
                body:{...data}
            }),
            invalidatesTags:["appointment"]
        }),
        getAllAppointments:builder.query({
            query:()=>"/appointment/all",
            providesTags:["appointment"]
        }),
        getAppointmentById:builder.query({
            query:(appointmentId)=>`/appointment/${appointmentId}`,
            providesTags:["appointment"]
        }),
        updateAppointent:builder.mutation({
            query:({appointmentId, data})=>({
                url:`/appointment/${appointmentId}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:["appointment"]
        }),
        updateAppointmentStatus:builder.mutation({
            query:({id, data})=>({
                url:`/appointment/update-appointment-status/${id}`,
                method:'PATCH',
                body:{...data}
            }),
            invalidatesTags:["appointment"]
        }),
        deleteAppointment:builder.mutation({
            query:(appointmentId)=>({
                url:`/appointment/${appointmentId}`,
                method:'DELETE',
            }),
            invalidatesTags:["appointment"]
        }),
        getAppointmentOfDoctor:builder.query({
            query:(doctorId)=>`/appointment/doctor/${doctorId}`,
            providesTags:["appointment"]
        }),
        getAppointmentOfPaitent:builder.query({
            query:(paitentId)=>`/appointment/paitent/${paitentId}`,
            providesTags:["appointment"]
        }),
    })
})

export const {
    useCreateAppointmentMutation,
    useDeleteAppointmentMutation,
    useGetAllAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useGetAppointmentOfDoctorQuery,
    useGetAppointmentOfPaitentQuery,
    useUpdateAppointentMutation,
    useUpdateAppointmentStatusMutation
} = appointmentApiSlice;