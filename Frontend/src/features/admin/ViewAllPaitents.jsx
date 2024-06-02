
import { useGetAllPaitentsQuery } from "../paitent/paitentApiSlice";


export default function ViewAllPaitents() {
  const {isLoading, isError, isSuccess, error, data} = useGetAllPaitentsQuery();
  let content;
  if(isLoading) content = <p>Loading...</p>
    if(isError) content = <p>{error?.data || "Something went worng"}</p>
    if(isSuccess){
        console.log(data)
        content = <div>
            <h1>List of All Paitent's</h1>
            <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Paitent Name</th>
                  <th>Email</th>
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
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Painent found Yet</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
    }

  return content;
}
