import { Dropdown, Space } from 'antd'
import React,{useState} from 'react'
import { UserOutlined } from '@ant-design/icons'
import Logout from './Logout'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from './GoogleLogin'


const Profile = () => {
    const [user , setUser] = useState(localStorage.getItem("email"));
    const [full_name , setFull_Name] =useState(localStorage.getItem("full_name"));
    const [ email , setEmail ] = useState(localStorage.getItem("email"));

    const[displayName , setDisplayName] = useState(localStorage.getItem("displayName"));
    const [google , setGoogle] = useState('');
  
    //   console.log(user);
    //   console.log(full_name,">>>>>>>>>>>>>>>>>>>>>>>>>>");
      const items =[
        {
            key:'1' ,
            label: user || email
        },
        {
            type: 'divider'
        } ,
        {
            key:'2',
            label:'Profile Settings'
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
                <Space className='header-profile' style={{color:'grey'}} >{displayName}{full_name}<UserOutlined /></Space>
            </Dropdown>
        </div>
    )
}
export default Profile