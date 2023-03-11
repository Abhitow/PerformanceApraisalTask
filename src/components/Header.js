import { Row, Col, Input } from 'antd'
import React, { useState,useEffect } from 'react'
import Profile from './Profile'
import download from '../download.png'
import Search from 'antd/es/transfer/search'
import axios from 'axios'


const HomeHeader = () => {

    const [search , setSearch] = useState();
    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    const mailId = localStorage.getItem("email");
  

    useEffect( () => {
        axios.get("https://demo.emeetify.com:81/appraisel/users/userNames").
        then((response) => {setSearch(response.data ,"111111111")}).
        catch((e)=>{console.log(e ,"error message")})
    },[]);
    console.log(search.data[0].user_id,"11111111");
    return (
        <div>
            <Row>
               <Col span={3}>
               <img src={download} className="skein-logo" alt="skeinlogo" />
               </Col>
               <Col span={3}>
                {
                    mailId ==="admin@gmail.com" ?
                    <Search style={{ width: '200px', marginTop: '20px',marginLeft:'50px'}} placeholder="Employee Name" onSearch={onSearch} enterButton /> :
                    console.log("")

                }
               </Col>
                
               <Col span={14}>
                    <h1 style={{ textAlign: 'center', marginTop: '0px',marginLeft:'-30px'  }}>Performance Appraisal Form</h1>
               </Col>

                <Col span={4}>< Profile /></Col>
            </Row>
        </div>
    )
}
export default HomeHeader