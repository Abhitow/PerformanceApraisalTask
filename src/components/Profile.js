import { Dropdown, Space } from 'antd'
import React,{useState} from 'react'
import { UserOutlined } from '@ant-design/icons'
import Logout from './Logout'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from './GoogleLogin'


const Profile = () => {
    const [user , setUser] = useState(localStorage.getItem("email"));
    const[displayName , setDisplayName] = useState(localStorage.getItem("displayName"));
    const [google , setGoogle] = useState('');
    const handleGoogle=()=>{
        fetch(auth,provider).then((data)=>{
         localStorage.getItem('email');
         localStorage.getItem('displayName');
            setGoogle(data);
            console.log(data);
              // setDatas(data.user.email);
              // console.log(datas,">>>>>>>>>>>>>>>>>>>>>>>>>>>");
        })
      }
      console.log(user);
      const items =[
        {
            key:'1' ,
            label: user
        },
        {
            type: 'divider'
        } ,
        {
            key:'3',
            label:'Profile Settings'
        },
        {
            type:'divider'
        } ,
        {
            key:'4',
            label:<Logout />
        }
    ]
    return(
        <div>
            <Dropdown menu={{items}}>
                <Space className='header-profile' style={{color:'blue'}} >{displayName}<UserOutlined /></Space>
            </Dropdown>
        </div>
    )
}
export default Profile