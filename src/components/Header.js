import { Row, Col, Input } from 'antd'
import React, { useState,useEffect } from 'react'
import Profile from './Profile'
import download from '../download.png'
import Search from 'antd/es/transfer/search'


const HomeHeader = () => {

    const [btnTogle, setBtnTogle] = useState(false)

    useEffect(() => {
        const emailCheck = localStorage.getItem("email")
        console.log("email", emailCheck)
        if (emailCheck == "admin@gmail.com") {
            setBtnTogle(true)
        }
        else {
            setBtnTogle(false)
        }
    }, [])

    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    return (
        <div>
            <Row>
                <img src={download} className="skein-logo" alt="skeinlogo" />
                {btnTogle ? (<Search style={{ width: '200px', marginTop: '20px', marginRight: '40px' }} placeholder="input search text" onSearch={onSearch} enterButton />) : null}

                {/* <Search style={{width:'200px',marginTop:'20px',marginRight:'40px'}} placeholder="input search text" onSearch={onSearch} enterButton /> */}

                <h1 style={{ textAlign: 'center', marginRight: '370px', marginTop: '0px', wordSpacing: '4px' }}>Performance Appraisal Form</h1>
                <Col>< Profile /></Col>
            </Row>
        </div>
    )
}
export default HomeHeader