import { Button } from "antd";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {  signOut } from "firebase/auth";
import {auth} from './GoogleLogin'

const Logout = () => {
  const navigate = useNavigate();


  const roleid = localStorage.getItem("role_id");
  // console.log(roleid,"lllllllll");
const navi = () =>{
  navigate("/");
 
}
async function handleLogout() {
  console.log("12345")
    localStorage.clear();
    await navi()
  }

  // const mail = localStorage.getItem("email");
  const role = localStorage.getItem("role_id");

  const handleGoogleLogout =() =>{
    signOut(auth).then(
      () =>{
        navigate("/");
        localStorage.clear();
        console.log("google logout");
      }
    ).catch(error => {console.log("error message" ,error)});
  }

  return (
    <>
      {
        role === "1" ?
        <Button type="default" onClick={handleLogout} style={{ marginLeft:'20px' }} >
        Logout
      </Button>:
        <Button type="default" onClick={handleGoogleLogout} style={{ marginLeft:'40px' }}>
        Logout
      </Button>
      }
    </>
  );
};
export default Logout;
