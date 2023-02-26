import { GoogleCircleFilled } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
function GoogleLoginn() {
    const responseGoogle = (response) => {
        console.log(response);
      }
  return (
    <div>
        <GoogleLogin 
        className='google-button'
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
       />
        {/* <Button className='google-button'>
            <div style={{display:'flex' ,flexDirection:'row'}}>
                <GoogleCircleFilled  className='google-icon'/>
                <Typography style={{color:'grey',marginRight:'40px'}}>Continue with Google</Typography>
            </div>
        </Button> */}
    </div>
  )
}

export default GoogleLoginn