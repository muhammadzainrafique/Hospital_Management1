import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode'
export default function useAuth() {
  let {token} = useSelector((state) => state.auth);
  if(token){
    const decode = jwtDecode(token);
    console.log(decode);
    const { username, name, email } = decode.UserInfo;
    return { username, role, email}
  }

  return {username:'', name:'', email:""}
}
