import { Dropdown, Space } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import Logout from './Logout'

const items =[
    {
        key:'1' ,
        label:'Profile'
    },
    {
        key:'2',
        label:'example@gmail.com'
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
const Profile = () => {
    return(
        <div>
            <Dropdown menu={{items}}>
                <Space className='header-profile' style={{color:'blue'}}>Profile <UserOutlined /></Space>
            </Dropdown>
        </div>
    )
}
export default Profile