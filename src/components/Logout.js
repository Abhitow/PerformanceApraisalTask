import { Button } from "antd";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      {
        role === "1" ?
        <Button type="default" onClick={handleLogout} style={{ marginLeft:'20px' }} >
        Logout
      </Button>:
        <Button type="default" onClick={handleLogout} style={{ marginLeft:'40px' }}>
        Logout
      </Button>
      }
    </>
  );
};
export default Logout;
