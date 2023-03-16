import { Button, message } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  const roleid = localStorage.getItem("role_id");
  // console.log(roleid,"lllllllll");
  function handleLogout() {

    navigate("/");
    localStorage.clear();
    // window.location.reload();

    messageApi.open({
      type: "success",
      content: "Logout Successfull",
    });
  }

  const mail = localStorage.getItem("email");
  const role = localStorage.getItem("role_id");

  return (
    <>
      {contextHolder}
      {
        role === "1" ?
        <Button type="default" onClick={handleLogout} style={{ marginLeft:'20px' }}>
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
