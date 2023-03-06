import download from "../download.png";
import undraw_Team from "../undraw_Team.png";

import React from "react";
import { Card, Form, Input, Button, message, Typography } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

import { auth, provider } from "../components/GoogleLogin";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import axios from "axios";


function Login({ isLoggedIn }) {
  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("unsuccess", errorInfo);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // const [datas , setDatas] = useState([]);

  const [google, setGoogle] = useState("");

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setGoogle(data.user.email);
      localStorage.setItem("displayName", data.user.displayName);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("token", data._tokenResponse.oauthAccessToken);
      axios
        .post("https://demo.emeetify.com:81/appraisel/users/register", {
          email: data.user.email,
        })
        .then((response) => console.log(response, "-------------->"))
        .catch((e) => console.log(e, "error message"));
      // console.log(data.user.email, "111111111111111");
      if (localStorage.getItem("token")) {
        navigate("/home");
        setGoogle(localStorage.getItem("email"));
      }
      // console.log("++++",google);
    });
  };
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem('email')) {
      navigate("/home");
    }else{
      navigate("/");
    }
  }, []);

  const handleClick = () => {
    fetch("https://demo.emeetify.com:81/daytodaytask/admin/adminlogin", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.full_name, "-------------------->");
        setResponseData(data);
        // Handle data
        localStorage.setItem("full_name", data.data.full_name);
        localStorage.setItem("email", data.data.email);
        // console.log(full_name,"<<<>>>>");
      })
      .catch((err) => {
        console.log("catch");
        console.log(err.message);
      });
    if (responseData.status === true) {
      console.log("login success");
      navigate("/home");
      message.open({
        type: "success",
        content: "Login Successfull",
      });
    } else {
      console.log("unsuccess");
    }
  };
  return (
    
    <div style={{display:'flex'}}>
      <div className="container">
        <Card className="card">
          <Form layout="vertical" onFinishFailed={onFinishFailed}>
            <img src={download} className="skein-logo" alt="skeinlogo" />

            {/* <h1 className='form-login-h1'>Login</h1> */}
            <Form.Item
              className="form-form-item"
              label="Email"
              name={"email"}
              rules={[
                {
                  required: "true",
                  message: "please enter valid email",
                },
              ]}
            >
              <Input
                className="form-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              className="form-form-item"
              label="Password"
              name={"password"}
              rules={[
                {
                  required: "true",
                  message: "please enter password",
                },
              ]}
            >
              <Input.Password
                className="form-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              {contextHolder}
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleClick}
                className="form-button"
              >
                <b>LOGIN</b>
              </Button>
            </Form.Item>
            <Typography style={{ color: "grey", textAlign: "center" }}>
              Or sign in with
            </Typography>
            {/* <GoogleLoginn /> */}
            {google ? (
              <Home />
            ) : (
              <GoogleButton
                onClick={handleGoogle}
                className="google-button-login"
              >
                SignIn with Google
              </GoogleButton>
            )}
          </Form>
        </Card>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginLeft: "100px",marginTop:'20px' }}>
        <Typography style={{textAlign:'center',marginBottom:'-10px',letterSpacing:'1px',wordSpacing:'4px'}}><h1>Apraisal 2022-2023</h1></Typography>
          <img
            src={undraw_Team}
            alt="skeinlogo"
            style={{ height: "500px", width: "600px" }}
          />
        </div>
        {/* <div style={{marginTop:'200px'}}>
            <img src={undraw_Personal}  alt="skeinlogo" style={{height:'250px',width:'250px',marginLeft:'50px'}}/>
      </div>
      <div style={{marginTop:'20px'}}>
            <img src={undraw_Meeting}  alt="skeinlogo" style={{height:'300px',width:'300px',marginLeft:'50px'}}/>
      </div> */}
      </div>
    </div>
  );
}

export default Login;
