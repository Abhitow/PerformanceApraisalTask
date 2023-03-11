import { Dropdown, Space } from 'antd'
import React,{useState} from 'react'
import { UserOutlined } from '@ant-design/icons'
import Logout from './Logout'


const Profile = () => {
    const [user , setUser] = useState(localStorage.getItem("email"));
    const [username , setUserName] =useState(localStorage.getItem("username"));
    const [ email , setEmail ] = useState(localStorage.getItem("email"));

    const[displayName , setDisplayName] = useState(localStorage.getItem("displayName"));
  
  const adminUserName = "Admin" ;
  const mailId = localStorage.getItem("email");
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
    return(
        <div>
            <Dropdown menu={{items}}>
                {
                    mailId === "admin@gmail.com" ? 
                    <Space className='header-profile' style={{color:'grey'}} >{adminUserName}<UserOutlined /></Space> :
                    <Space className='header-profile' style={{color:'grey'}} >{displayName}<UserOutlined /></Space>
                }
            </Dropdown>
        </div>
    )
}
export default Profile