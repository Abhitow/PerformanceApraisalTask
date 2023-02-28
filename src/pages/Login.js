import download from '../download.png'
import React from 'react'
import {Card , Form ,Input ,Button ,message, Typography} from 'antd'
import { useState ,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {GoogleCircleFilled} from '@ant-design/icons'
import GoogleLogin from '../components/GoogleLogin';
import Home from './Home'



// import GoogleLoginn from '../components/GoogleLogin';
import {auth ,provider} from '../components/GoogleLogin'
import {signInWithPopup} from 'firebase/auth'
import GoogleButton from 'react-google-button';



// import Axios from 'axios'

function Login() {
  const navigate =useNavigate()
  const onFinishFailed = (errorInfo) => {
  console.log("unsuccess" , errorInfo);}
  const [email ,setEmail] =useState("")
  const [password ,setPassword] =useState("");
  const [responseData ,setResponseData] = useState("");
  const [messageApi ,contextHolder] = message.useMessage();

// const [datas , setDatas] = useState([]);
  
  const [google , setGoogle] = useState('');
  var isLoggedIn = localStorage.getItem("token");

  const handleGoogle=()=>{
    signInWithPopup(auth,provider).then((data)=>{
      // console.log(provider, "++++++++++++++");
      console.log("++++",data)
        setGoogle(data.user.email);
          localStorage.setItem("displayName" , data.user.displayName);
          localStorage.setItem("email",data.user.email);
          navigate("/home");
          // setDatas(data.user.email);
          // console.log(datas,">>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log("++++",google);
    })
  }
 
  useEffect(() => {
   setGoogle(localStorage.getItem('email'));
  },[]);


const handleClick =() => {
  handleGoogle();
  fetch("http://demo.emeetify.com:8080/daytodaytask/admin/adminlogin", {
    method: 'POST',
    body: JSON.stringify({
        email : email ,
        password : password
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
     .then((response) => response.json())
     .then((data) => {
        console.log(data);
        setResponseData(data)
        // Handle data
     })
     .catch((err) => {
      console.log("catch")
        console.log(err.message);
     });
     if(responseData.status === true )
     {
       console.log("login success")
       navigate("/home")
       message.open({
        type:'success',
        content:'Login Successfull'
    })
  }
     else{
      console.log("unsuccess")
    }    
}


return (
    <div className='container'>
      <Card className='card'>
        <Form layout='vertical'  onFinishFailed={onFinishFailed} >
        <img src={download} className="skein-logo" alt="skeinlogo" />

          {/* <h1 className='form-login-h1'>Login</h1> */}
            <Form.Item 
            className='form-form-item'
            label='Email'
            name={"email"}
            rules={[
              {
                required:'true',
                message:'please enter valid email',  
              },
            ]}
            >
              <Input className='form-input' value={email} onChange={(e)=>{setEmail(e.target.value)}}  autoComplete='off'/>
            </Form.Item>
            <Form.Item 
            className='form-form-item'
            label='Password'
            name={"password"}
            rules={[
              {
                required:'true',
                message:'please enter password',
              },
            ]}
            >
              <Input.Password className='form-input' value={password} onChange={(e)=>{setPassword(e.target.value)}}   />
            </Form.Item>
            <Form.Item >
              {contextHolder}
            <Button type='primary' htmlType='submit' onClick={handleClick}  className='form-button' ><b>LOGIN</b></Button>
            </Form.Item>
            <Typography style={{color:'grey',textAlign:'center'}}>Or sign in with</Typography>
            {/* <GoogleLoginn /> */}
            {google? <Home />:
            <GoogleButton onClick={handleGoogle} style={{marginLeft:'30px',width:'300px',marginTop:'30px',height:'50px'}}>SignIn with Google</GoogleButton>
          
          }
        </Form>
      </Card>
     
    </div>
  );
}

export default Login