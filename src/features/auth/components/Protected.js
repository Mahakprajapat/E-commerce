import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import {selectLoggedInUser} from  "../authSlice";

// it will check weather the user in logged in or not if not then user cannot visit some route
export default function Protected({children}) {
    const user = useSelector(selectLoggedInUser)

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
  return children;
}
