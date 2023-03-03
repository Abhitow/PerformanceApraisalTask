import { Row , Col } from 'antd'
import React from 'react' 
import Profile from './Profile'
import download from '../download.png'


const HomeHeader =() =>{
    return(
        <div>
            <Row>
                <img src={download} className="skein-logo" alt="skeinlogo" />
                <Col>< Profile /></Col>
            </Row>
        </div>
    )
}
export default HomeHeader