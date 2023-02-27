import { Button ,message} from 'antd'
// import * as firebase from 'firebase'
// import { auth } from 'firebase/Auth';
// require('firebase/auth');
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { auth } from "firebase/app";
// import "firebase/auth";
// console.log("AUTH",auth);

const Logout = () =>{
    const navigate = useNavigate();
    const [messageApi , contextHolder] = message.useMessage();

function handleLogout(){
    
    messageApi.open({
        type:'success',     
        content:'Logout Successfull'
    })
    // firebase.signOut(firebase.getAuth);
    navigate("/");

    localStorage.clear()
        window.location.reload()

}

// const signOut = async () => {
//     firebase.auth().signOut();
// }
    return (
        <>
        {contextHolder}
        <Button type='default' onClick={handleLogout} style={{border:'none'}}>Logout</Button>
        </>
        
    )
}
export default Logout