import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLogout } from "./LoginReducer";
import { useDispatch } from "react-redux";


const LogOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(userLogout())
      alert("You have Logged Out Successfully");
      navigate("/");      
    },[])
    /*const SignPage = () => {
        navigate("/auth");
    }*/

  return (
    <div>
         {/* <h1>You have Logged Out Successfully </h1>
          <Button onClick={SignPage}>Go Back to Sign Page</Button>*/}
    </div>
  );
};

export default LogOut;