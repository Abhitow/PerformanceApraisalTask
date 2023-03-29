import { Dropdown, Space } from 'antd'
import React,{useState} from 'react'
import { UserOutlined } from '@ant-design/icons'
import Logout from './Logout'


const Profile = () => {
    const [user , setUser] = useState(localStorage.getItem("email"));
    const [username , setUserName] =useState(localStorage.getItem("username"));
    const [ email , setEmail ] = useState(localStorage.getItem("email"));

    const[displayName , setDisplayName] = useState(localStorage.getItem("displayName"));
  
      const items =[
        {
            key:'1' , 
            label: user || email    
        },
        {
            type:'divider'
        } ,
        {
            key:'3',
            label:<Logout />
        }
    ]
    const role = localStorage.getItem("role_id");
    console.log(typeof(role,"aaaaaaaa"));
    return(
        <div>
            <Dropdown menu={{items}}>
                    <Space className='header-profile' style={{color:'grey'}} >{role === "1" ? username : displayName}<UserOutlined /></Space> 
            </Dropdown>
        </div>
    )
}
export default Profile