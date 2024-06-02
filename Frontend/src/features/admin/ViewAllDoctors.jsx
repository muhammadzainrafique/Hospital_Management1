import { useGetAllDoctorsQuery } from "../doctor/doctorApiSlice";



export default function ViewAllDoctors() {
  const {isLoading, isError, isSuccess, error, data} = useGetAllDoctorsQuery();
  let content;
  if(isLoading) content = <p>Loading...</p>
    if(isError) content = <p>{error?.data || "Something went worng"}</p>
    if(isSuccess){
        console.log(data)
        content = <div>
            <h1>List of All Doctor's</h1>
            <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {
                  (data?.Message?.length ? (
                    data.Message.map((paitent, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{paitent?.name}</td>
                        <td>{paitent?.email}</td>
                        <td>{paitent?.experience || 1} Year</td>
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Doctor  found Yet</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
    }

  return content;
}
