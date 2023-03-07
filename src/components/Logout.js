import { Button, message } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  function handleLogout() {
   
    navigate("/");
    localStorage.clear();
    window.location.reload();

    messageApi.open({
      type: "success",
      content: "Logout Successfull",
    });
  }

  return (
    <>
      {contextHolder}
      <Button type="default" onClick={handleLogout} style={{ marginLeft:'40px' }}>
        Logout
      </Button>
    </>
  );
};
export default Logout;
