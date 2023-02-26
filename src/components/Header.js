import { Row , Col } from 'antd'
import React from 'react' 
import Profile from './Profile'
import download from '../download.png'


const HomeHeader =() =>{
    return(
        <div>
            <Row>
                {/* <h1 style={{margin:'auto',marginLeft:'0px',color:'white'}}>Skein Technologies Private Limited</h1> */}
                <img src={download} className="skein-logo" alt="skeinlogo" />

                <Col>< Profile /></Col>
            </Row>
        </div>
    )
}
export default HomeHeader