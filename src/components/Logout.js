import { Button ,message} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () =>{
    const navigate = useNavigate();
    const [messageApi , contextHolder] = message.useMessage();

function handleLogout(){
    
    messageApi.open({
        type:'success',
        content:'Logout Successfull'
    })
    navigate("/");

}
    return (
        <>
        {contextHolder}
        <Button type='default' onClick={handleLogout} style={{border:'none'}}>Logout</Button>
        </>
        
    )
}
export default Logout